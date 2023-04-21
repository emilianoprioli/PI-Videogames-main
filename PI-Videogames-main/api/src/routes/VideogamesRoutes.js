
const {getAllGamesAPI,getGameByID,getGamesByName} = require("../controllers/GamesControllers.js")
const {GamesPost} = require("../controllers/GamesDBController.js")
const { Router } = require('express');

const router = Router();

//!traer aca la funcion findOrCreate de juegos en el arcgivo GamesDBController
router.post("/",async(req,res)=>{
    const CreateBDD = await GamesPost(req.query)
    try {
        res.status(200).json(CreateBDD);
    } catch (error) {
        res.status(500).json(error.message);
    }
})


//! /laurl (?query=) LOS PARETENSIS ES PARA DIFERENCIAR, LA QUERY VA DESP DEL ?
router.get("/pag",async(req,res)=>{
    const {pag} = req.query
    console.log(pag);
    const getAll = await getAllGamesAPI(pag);
    try {
        res.status(200).json(getAll)
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/name",async(req,res)=>{
    const {name} = req.query;
    console.log(name);
    const funcion = await getGamesByName(name);
    try {
        res.status(200).json(funcion);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/detail/:id",async(req,res)=>{
    const {id} = req.params;
    const game = await getGameByID(id);
    try {
        res.status(200).json(game);
    } catch (error) {
        res.status(500).json(error.message);
    }

})

router.get("/:idVideogame",async(req,res)=>{
    try {
        const {idVideogame} = req.params
        const getBID = await getGameByID(idVideogame);
        res.status(200).json(getBID);
    } catch (error) {
        res.status(500).json(error.message);
    }    
})


module.exports = router