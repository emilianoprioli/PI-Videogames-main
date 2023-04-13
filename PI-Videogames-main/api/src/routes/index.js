const { Router } = require('express');
const morgan = require("morgan")
const GamesRoutes = require("./VideogamesRoutes.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames",GamesRoutes);

module.exports = router;
