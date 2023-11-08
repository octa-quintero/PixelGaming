const { Users } = require("../db");
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

const getAllUsers = async (req, res, next) => {
  try {
    // Realiza una consulta para obtener todos los usuarios en la tabla Users
    const users = await Users.findAll();

    // Comprueba si se encontraron usuarios
    if (users.length === 0) {
      return res.status(404).json({ message: "No se encontraron usuarios en la base de datos" });
    }

    // Devuelve los usuarios encontrados como respuesta
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al consultar usuarios:", error);
    res.status(500).json({ error: "Error al consultar usuarios" });
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
    
    // Autenticación exitosa, generar un token JWT
    const token = jwt.sign({ userId: user.id }, process.env.SECRET_KEY, {
      expiresIn: '168h' // Puedes ajustar la expiración del token según tus necesidades
    });
    
    console.log('Token generado:', token);

    res.status(200).json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    
    res.status(500).json({ error: "Error en el inicio de sesión" });
    next(error);
  }
};



module.exports = { 
  createUser,
  getAllUsers,
  login
};

