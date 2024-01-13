const { Router } = require('express');
const games =require("./games.js");
const users =require("./users.js");
const admin =require("./admin.js")
const reviews =require("./reviews.js");

// Importar todos los routers
const router = Router();

router.use("/", games )
router.use("/", reviews )
router.use("/", users )
router.use("/", admin )


module.exports = router;