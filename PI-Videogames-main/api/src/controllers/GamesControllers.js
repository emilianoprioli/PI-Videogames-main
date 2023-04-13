const sequelize = require("sequelize")
const {Videogame,Genre} = require("../db.js")
const axios = require("axios");
require('dotenv').config();
const {API,APIKEY} = process.env;


const AUXgetAllGamesAPI = async () => {
    let array = [];
    const get = await axios.get(`${API}?key=${APIKEY}`); //!url base
    array.push(`${API}?key=${APIKEY}`);
    let auxExterno = get.data.next; //! guarda la url de la segunda
    let i = 0;
    while (i <= 3) {
        //let internalAux = aux 
        let auxiliarInterno = auxExterno //! es el auxiliar para que trabaje el while
        array.push(auxiliarInterno); //! guarda la pagina 2 en el array
        let otroAuxiliar = await axios.get(auxiliarInterno); //! hace el get de la pagina 2
        auxExterno = otroAuxiliar.data.next; //! le dice al auxiliar de afuera que sea igual a la pagina 3
        i++;
    }
    return(array);
};

const getAllGamesAPI = async () => {
    const array = await AUXgetAllGamesAPI() //! recibe todas las url
    let contador = 0 //! cuenta que traiga los 100 juegos
    let aux,arrayResults = [];

    for (let i = 0; i < array.length; i++) { //! recorre todas las url

        aux = await axios.get(array[i]) //! le da al auxiliar de afuera la url en la pos. i 


        await aux.data.results.map((el)=>{ //! retorna la info que queres
                const {id,name,description,released,background_image,rating,plataforms} = el

                arrayResults.push({ //! aca pushea al array de afuera
                    cuenta:contador++,
                    id: id,
                    name: name,
                    description: description,
                    released: released,
                    background_image: background_image,
                    rating: rating,
                    plataforms: plataforms,
                    createdInDB:false
        })
    })
        
    }
    console.log("cuenta",contador);
    return arrayResults;
}

//! ARREGLAR EL TEMA DEL ID

const getGameByID = (id) => {
    if(typeof id === "number"){
        return new Promise((resolve,reject)=>{
            axios.get(`${API}/${id}?key=${APIKEY}`) 
            .then(res=>{
                try {
                    resolve(res.data);
                } catch (error) {
                    reject(error.message);
                }
            })
        })
    }
    throw new Error("id must be a number");
}

//!*********************************************************************************************!

// const getGamesByName = async (name) => {
//     const array = [];
//     let contador = 0;
//     let contadorAux = 0;
//     const get = await axios.get(`${API}?key=${APIKEY}&search=${name}`);
//     await get.data.results.map((el)=>{
//         const {id,name,description,released,background_image,rating,plataforms} = el
//         if(contador <=15){
//             contador++
//             array.push({
//                     cuenta:contadorAux++,
//                     id: id,
//                     name: name,
//                     description: description,
//                     released: released,
//                     background_image: background_image,
//                     rating: rating,
//                     plataforms: plataforms,
//                     createdInDB:false
//             })
//         }
//         return;
//     })
//     return array;
// }

const getGamesByName = async (name) => {
    const array = [];
    const get = await axios.get(`${API}?key=${APIKEY}&search=${name}`);
    get.data.results.forEach((el, index) => {
      const { id, name, description, released, background_image, rating, platforms } = el;
      if (index < 15) {
        array.push({
          cuenta: index,
          id: id,
          name: name,
          description: description,
          released: released,
          background_image: background_image,
          rating: rating,
          platforms: platforms,
          createdInDB: false,
        });
      }
    });
    return array;
  };
 
// const getGameByIDDB =async () => {
//     return await Videogame.findAll({
//         include:{
//             model:Genre,
//             attributes:["name"],
//             through:{
//                 attributes:[],
//             }
//         }
//     })
// }

module.exports = {
    getAllGamesAPI,
    getGameByID,
    getGamesByName,
}