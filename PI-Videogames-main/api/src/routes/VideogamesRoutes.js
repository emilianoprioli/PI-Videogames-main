const {getGameByID,getGamesByName,contador,getAllGamesAPI} = require("../controllers/GamesControllers.js")
const {GamesPost,searchByName,getGamesByPK} = require("../controllers/GamesDBController.js")

const { Router } = require('express');
const router = Router();



//! crea los juegos en la base de datos
router.post("/",async(req,res)=>{
    const CreateBDD = await GamesPost(req.query);
    try {
        res.status(200).json(CreateBDD);
    } catch (error) {
        res.status(500).json(error);
    }
})

//! /laurl (?query=) LOS PARETENSIS ES PARA DIFERENCIAR, LA QUERY VA DESP DEL ?
//! este trae todo al home
router.get("/home",async(req,res)=>{
    const arrayDB = await getGamesByPK()
    const arrayAPI = await getAllGamesAPI();
    const test = await contador(arrayDB,arrayAPI)
    try {
        res.status(200).json(test)
        } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/name",async(req,res)=>{
    const {name} = req.query;
    const gamesByNameDB = await searchByName(name);
    const gamesByNameAPI =await getGamesByName(name);
    const response = await contador(gamesByNameDB,gamesByNameAPI)
    try {
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/detail/:id",async(req,res)=>{
    const {id} = req.params;
    const game = await getGameByID(id);
    console.log("game",game);
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