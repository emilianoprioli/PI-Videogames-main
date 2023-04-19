const { Router } = require('express');
const {GenresDB} = require("../controllers/GamesDBController")
const router = Router();


router.get("/",async(req,res)=>{
    const genre = await GenresDB()
    try {
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json(error.message);
    }
})

module.exports = router