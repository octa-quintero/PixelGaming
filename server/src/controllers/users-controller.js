const { Countries, TouristActivity} = require("../db");
const axios = require("axios");


// Crear actividad turística
const createActivity = async (req, res, next) => {
  try {
    console.log("Creating new activity...");

    const { name, difficult, duration, season, countries } = req.body;
    console.log("Received data:", req.body);

    // Crear una nueva actividad turística en la base de datos
    const newActivity = await TouristActivity.create({
      id: countries[0],
      name,
      difficult,
      duration,
      season,
      countries,
    });

    // Asociar la actividad turística al país seleccionado
    if (countries && countries.length > 0) {
      const selectedCountry = await Countries.findOne({
        where: { id: countries[0] },
      });

      if (selectedCountry) {
        await newActivity.addCountries(selectedCountry);
      }
    }

    console.log("Activity created:", newActivity);

    res.status(201).json(newActivity);
  } catch (error) {
    console.error('Error al crear la actividad turística:', error);
    res.status(500).json({ error: 'Error al crear la actividad turística' });
    next(error);
  }
};


// Obtener actividades turísticas con toda su información
const getActivities = async (req, res, next) => {
  try {
    const { order } = req.query;

    // Filtrar y obtener actividades según el parámetro de orden
    let activities;
    if (order === 'all') {
      activities = await TouristActivity.findAll({
        include: [
          {
            model: Countries,
            attributes: ['id', 'name', 'image'],
            through: { attributes: [] },
          },
        ],
      });
    } else if (['Verano', 'Otoño', 'Invierno', 'Primavera'].includes(order)) {
      activities = await TouristActivity.findAll({
        where: { season: order },
        include: [
          {
            model: Countries,
            attributes: ['id', 'name', 'image'],
            through: { attributes: [] },
          },
        ],
      });
    } else if (parseInt(order) >= 1 && parseInt(order) <= 5) {
      activities = await TouristActivity.findAll({
        where: { difficult: parseInt(order) },
        include: [
          {
            model: Countries,
            attributes: ['id', 'name', 'image'],
            through: { attributes: [] },
          },
        ],
      });
    } else {
      // Manejo de casos no válidos
      res.status(400).json({ error: 'Parámetro de orden no válido' });
      return;
    }

    res.status(200).json(activities); // Enviar las actividades como respuesta
  } catch (error) {
    console.error('Error al obtener las actividades turísticas:', error);
    res.status(500).json({ error: 'Error al obtener las actividades turísticas' });
    next(error);
  }
};



module.exports = { 
  createActivity,
  getActivities
};

