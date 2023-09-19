const { Router } = require('express');
const games =require("./games.js");
const users =require("./users.js");

// Importar todos los routers
const router = Router();

// Configurar los routers y usa el router 'countries' y 'activities' en la ruta base '/'
router.use("/", games )
router.use("/", users)


module.exports = router;