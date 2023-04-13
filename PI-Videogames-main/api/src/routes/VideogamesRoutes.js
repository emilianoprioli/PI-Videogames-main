
const {getAllGamesAPI,getGameByID,getGamesByName} = require("../controllers/GamesControllers.js")
const { Router } = require('express');

const router = Router();

router.get("/",async(req,res)=>{
    const getAll = await getAllGamesAPI(2)
    try {
        res.status(200).send(getAll)
        
    } catch (error) {
        res.status(500).json(error.message);
    }
})

router.get("/game",async(req,res)=>{
    const {name} = req.query;
    console.log("name",name);
    const funcion = await getGamesByName(name);
    try {
        res.status(200).json(funcion);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

// router.get("/:idVideogame",async(req,res)=>{
//     try {
//         const {idVideogame} = req.params
//         const getBID = await getGameByID(idVideogame);
//         res.status(200).json(getBID);
//     } catch (error) {
//         res.status(500).json(error.message);
//     }    
// })


module.exports = router