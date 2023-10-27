const { Users } = require("../db");
const axios = require("axios");


// Crear User
const createUser = async (req, res, next) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { name, last_name, name_user, password, email, avatar } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await Users.findOne({ where: { name_user } });

    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso" });
    }

    // Crear un nuevo usuario en la base de datos
    const newUser = await Users.create({
      name,
      last_name,
      name_user,
      password,
      email,
      avatar,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear un usuario:", error);
    res.status(500).json({ error: "Error al crear un usuario" });
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Extraer los datos del cuerpo de la solicitud
    const { name_user, password } = req.body;

    // Buscar al usuario por nombre de usuario (name_user) en la base de datos
    const user = await Users.findOne({ where: { name_user } });

    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    // Validar la contraseña
    if (user.password !== password) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    // Autenticación exitosa
    res.status(200).json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).json({ error: "Error en el inicio de sesión" });
    next(error);
  }
};



module.exports = { 
  createUser,
  login
};

