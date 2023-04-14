const { Router } = require('express');
const {getAllGenres} = require("../controllers/GenreControllers");
const router = Router();


router.get("/",async(req,res)=>{
    const respuesta = await getAllGenres();
    try {
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json(error.message);    
    }
})

module.exports = router