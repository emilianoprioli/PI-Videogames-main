const {getAllGamesAPI,getGameByID,getGamesByName} = require("../controllers/GamesControllers.js")
const {GamesPost, getAllGames} = require("../controllers/GamesDBController.js")
const { Router } = require('express');

const router = Router();

//!traer aca la funcion findOrCreate de juegos en el arcgivo GamesDBController
const getApiAndDB = async () => {
    const CreateBDD = await GamesPost(req.query);
    const getGamesDB = await getAllGames()
    console.log("JJJJJJJJJJJJJJJJJJJJJJJ", getGamesDB);
    return getGamesDB
}


router.post("/",async(req,res)=>{
    const games = getApiAndDB()
    console.log(games);
    try {
        res.status(200).json(games);
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