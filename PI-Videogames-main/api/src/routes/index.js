const { Router } = require('express');
const GamesRoutes = require("./VideogamesRoutes.js")
const GenresRoutes = require("./GenresRoutes.js")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/videogames",GamesRoutes);
router.use("/genres",GenresRoutes);

module.exports = router;
