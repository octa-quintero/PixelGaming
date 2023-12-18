require('dotenv').config();
const { Users, Op } = require("../db");
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");

// Crear User
const createUser = async (req, res, next) => {
  try {
    const { name, last_name, name_user, password, email, avatar } = req.body;

    const existingUser = await Users.findOne({ where: { name_user } });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    const newUser = await Users.create({
      name,
      last_name,
      name_user,
      password: hashedPassword,
      email,
      avatar,
    });

    // Agregar un console.log para verificar si el usuario se creó con éxito
    console.log('Usuario creado con éxito:', newUser);

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear un usuario:", error);
    res.status(500).json({ error: "Error al crear un usuario" });
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ error: "Debe proporcionar un userId" });
    }
    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error al consultar usuario:", error);
    res.status(500).json({ error: "Error al consultar usuario" });
    next(error);
  }
};


const login = async (req, res, next) => {
  try {
    const { name_user, password } = req.body;

    const user = await Users.findOne({ where: { name_user } });
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

      // Autenticación exitosa, generar un token JWT con información adicional
      const refreshToken = jwt.sign(
        { userId: user.id, username: user.name_user, avatar: user.avatar },
        process.env.JWT_SECRET,
        { expiresIn: '168h' }
      );

    user.refreshToken = refreshToken;

    try {
      user.updatedAt = new Date();
      await user.save();
    } catch (error) {
      console.error('Error al guardar el refresh token:', error);
      return res.status(500).json({ message: 'Error al guardar el refresh token' });
    }

    res.status(200).json({ message: "Inicio de sesión exitoso", token: refreshToken });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    
    res.status(500).json({ error: "Error en el inicio de sesión" });
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    const user = req.user;

    // Verificar si el usuario tiene un refreshToken almacenado
    if (!user.refreshToken) {
      return res.status(401).json({ error: 'No hay token para invalidar' });
    }

    user.refreshToken = null;

    try {
      await user.save();
    } catch (error) {
      console.error('Error al guardar la invalidación del token:', error);
      return res.status(500).json({ error: 'Error al guardar la invalidación del token' });
    }
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ error: 'Error del servidor al cerrar sesión' });
    next(error);
  }
};


// Modificar información del usuario
const updateUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { name, last_name, name_user, password, email, avatar } = req.body;

    const user = await Users.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verificar si hay otro usuario con el mismo nombre de usuario
    const existingUserByUsername = await Users.findOne({
      where: { name_user, id: { [Op.not]: userId } }
    });

    if (existingUserByUsername) {
      return res.status(400).json({ error: "Nombre de usuario ya está en uso" });
    }

    // Verificar si hay otro usuario con el mismo correo electrónico
    const existingUserByEmail = await Users.findOne({
      where: { email, id: { [Op.not]: userId } }
    });

    if (existingUserByEmail) {
      return res.status(400).json({ error: "Correo electrónico ya está en uso" });
    }

    // Actualizar campos proporcionados
    if (name) user.name = name;
    if (last_name) user.last_name = last_name;
    if (name_user) user.name_user = name_user;
    if (email) user.email = email;
    if (avatar) user.avatar = avatar;

    // Actualizar contraseña si se proporciona
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "Usuario actualizado con éxito", user });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
    next(error);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Busca al usuario por su correo electrónico
    const user = await Users.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Genera un token de restablecimiento de contraseña
    const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Almacena el token en la base de datos
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Válido por 1 hora
    await user.save();

    // Enlace de verificación
    const verificationLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;


    // URL de la imagen que deseas incluir
    const imageUrl = 'https://i.imgur.com/plmrbXp.png';

    const emailStyle = `
    <div style="
      font-family: 'Arial', sans-serif;
      color: black;
      display: flex;
      justify-content: space-evenly;
      align-items: space-evenly;
      font-family: 'Ubuntu', sans-serif;
      background-color: #2a2a2abb;
      border-radius: 10px;
      padding: 30px;
      box-shadow: 0 6px 8px rgba(0, 0, 0, 0.4);
      flex-direction: column;
      gap: 50px;
      height: 35vh;
    ">
      <div style="
      text-align: center;
      margin: 20px 0;
      ">
        <p style="
          margin-bottom: 30px;
          font-size: 18px;">
          <b>Haz clic en el botón para restablecer tu contraseña</b></p>
        <a href="${verificationLink}" style="
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;"
        >
          <button style="
            border-radius: 5px;
            color: black;
            background-color: #2464ad;
            width: 30%;
            height: 40px;
            margin: 10px auto;
            font-size: 18px;
            font-weight: bold;
            outline: none;
            border: none;
            gap: 5px;
            cursor: pointer;
          ">Restablecer Contraseña</button>
        </a>
        <p style="margin: 0;"><img src="${imageUrl}" alt="Tu imagen" style="
          max-width: 30%;
          height: auto;"></p>
      </div>
    </div>
  `;
    


    const info = await transporter.sendMail({
      from: '"Forgot Password" <octa.quinteroo@gmail.com>',
      to: user.email,
      subject: 'Forgot Password - PixelGaming',
      html: emailStyle,
    });

    res.status(200).json({ message: 'Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.' });
  } catch (error) {
    console.error('Error al solicitar el restablecimiento de contraseña:', error);
    res.status(500).json({ message: 'Error al solicitar el restablecimiento de contraseña.' });
  }
};


const resetPassword = async (req, res) => {
  try {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    console.log('Reset Token received on the server:', resetToken);

    // Busca al usuario por el token de restablecimiento de contraseña
    const user = await Users.findOne({ 
      where: {
        resetPasswordToken: resetToken,
      }
    });

    if (!user) {
      return res.status(400).json({ message: 'Enlace de restablecimiento de contraseña no válido o ha expirado.' });
    }

    // Verifica el token utilizando el secreto correcto (usando process.env.JWT_SECRET)
    const decodedToken = jwt.verify(resetToken, process.env.JWT_SECRET);

    // Actualiza la contraseña y limpia los campos relacionados con el restablecimiento
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const refreshToken = jwt.sign(
      { userId: user.id, username: user.name_user, avatar: user.avatar },
      process.env.JWT_SECRET,
      { expiresIn: '168h' }
      );
      user.refreshToken = refreshToken;
    
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Contraseña restablecida con éxito.' , token: refreshToken });
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    res.status(500).json({ message: 'Error al restablecer la contraseña.' });
  }
};


module.exports = { 
  createUser,
  getUserById,
  updateUser,
  forgotPassword,
  resetPassword,
  login,
  logout
};