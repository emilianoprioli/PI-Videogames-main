const {getGameByID,getGamesByName,contador} = require("../controllers/GamesControllers.js")
const {GamesPost,searchByName} = require("../controllers/GamesDBController.js")

const { Router } = require('express');
const router = Router();



//! crea los juegos en la base de datos
router.post("/",async(req,res)=>{
    const CreateBDD = await GamesPost(req.query);
    try {
        res.status(200).json(CreateBDD);
    } catch (error) {
        res.status(500).json(error.message);
    }
})



//! /laurl (?query=) LOS PARETENSIS ES PARA DIFERENCIAR, LA QUERY VA DESP DEL ?
//! este trae todo al home
router.get("/home",async(req,res)=>{
    const test = await contador()
    try {
        res.status(200).json(test)
        } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/name",async(req,res)=>{
    const {name} = req.query;
    console.log("name del query en el router del back",name);
    const gamesByNameDB = await searchByName(name);
    const gamesByNameAPI =await getGamesByName(name);
    //const response = gamesByNameDB.concat(gamesByNameAPI);
    try {
        res.status(200).json(gamesByNameAPI);
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