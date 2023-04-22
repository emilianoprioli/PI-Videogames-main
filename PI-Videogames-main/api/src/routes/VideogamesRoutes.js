const {getAllGamesAPI,getGameByID,getGamesByName} = require("../controllers/GamesControllers.js")
const {GamesPost, getAllGames,searchByName} = require("../controllers/GamesDBController.js")
const { Genre, Videogame } = require('../db');
const { Router } = require('express');
const router = Router();

//* retorna la tabla relacional en forma de array
const getDB = async () => {
    const getGamesDB = await getAllGames()
    const promises = await getGamesDB.map((el)=>el.getGenres());
    const genres = await Promise.all(promises);
    return genres
}

const getGamesByPK = async () => {
    //* pedimos la tabla relacional
    const relationalTable = await getDB();
    const gameWithGenre = [];
    //* por cada dato de la tabla la recorremos
    for (let i = 0; i < relationalTable.length; i++) {
        const genresName = [];
        let actualGameId
        //*recorremos cada dato basandonos en id (cada juego) 
        relationalTable[i].map((el)=>{
            //*tomamos el id del juego para pedirlo despues
            actualGameId = el.dataValues.videogames_genres.dataValues.videogameId;
            //* y tomamos cada uno de sus generos
            genresName.push(el.dataValues.name);
        })
        //* relacionamos a cada juego dentro de un obj con sus respectivo genero
        const obj = {
            genres : genresName,
            restOfData : await Videogame.findByPk(actualGameId)
        }
        gameWithGenre.push(obj);
    }
    return gameWithGenre;
}




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
// router.get("/home",async(req,res)=>{
//     const {pag} = req.query
//     console.log(pag);
//     //* juegos de la base
//     const gamesDB = await getGamesByPK()
//     //* juegos de la api
//     const gamesApi = await getAllGamesAPI(pag);
//     if (pag <= 0 && gamesDB.length <= 15) {
//         const DBandApiConcated = await gamesDB.concat(gamesApi);
//         try {
//             res.status(200).json(DBandApiConcated)
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     }
//     else{
//         try {
//             res.status(200).json(gamesApi)
//         } catch (error) {
//             res.status(500).json(error.message);
//         }
//     }
// })

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