const { Users, Op } = require("../db");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");


// Crear User
const createUser = async (req, res, next) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { name, last_name, name_user, password, email, avatar } = req.body;

    // Verificar si el usuario ya existe  
    const existingUser = await Users.findOne({ where: { name_user } });

    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    // Crear un nuevo usuario en la base de datos
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
    const token = jwt.sign(
      { userId: user.id, username: user.name_user, avatar: user.avatar },
      process.env.SECRET_KEY,
      {
        expiresIn: '168h' // Puedes ajustar la expiración del token según tus necesidades
      }
    );
    
    console.log('Token generado:', token);

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    
    res.status(500).json({ error: "Error en el inicio de sesión" });
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




module.exports = { 
  createUser,
  getUserById,
  updateUser,
  login
};

