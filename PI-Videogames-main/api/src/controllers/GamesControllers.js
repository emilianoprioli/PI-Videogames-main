const {getGamesByPK} = require("./GamesDBController");
const { Genre, Videogame } = require('../db');
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

// const getAllGamesAPI = async (pag) => {
//     const array = await AUXgetAllGamesAPI() //! recibe todas las url
//     let contador = 0;
//     let aux = await axios.get(array[pag]); 

//        return await aux.data.results.map((el)=>{ //! retorna la info que queres
//                 const {id,name,description,released,background_image,rating,plataforms} = el
                
//                 return({ //! aca pushea al array de afuera
//                     id: id,
//                     name: name,
//                     description: description,
//                     released: released,
//                     background_image: background_image,
//                     rating: rating,
//                     plataforms: plataforms,
//                     createdInDB:false
//         })
//     })
// }


const getAllGamesAPI = async () => {
  const array = await AUXgetAllGamesAPI() //! recibe todas las url
  let contador = 0 //! cuenta que traiga los 100 juegos
  let aux,arrayResults = [];
  

  for (let i = 0; i < array.length; i++) { //! recorre todas las url

      aux = await axios.get(array[i]) //! le da al auxiliar de afuera la url en la pos. i 

            await aux.data.results.map((el)=>{ //! retorna la info que queres
              const {id,name,description,released,background_image,rating,plataforms} = el
              
              arrayResults.push({
                cuenta:contador++, //! aca pushea al array de afuera
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

const contador = async (arrayDB,arrayAPI) => {
  const arrayForSlice = arrayDB.concat(arrayAPI);
  console.log("100 juegos",arrayDB);
  const arrayForReturn = [];
  for (let i = 0; i < arrayForSlice.length; i +=15) {
    arrayForReturn.push(arrayForSlice.slice(i, i + 15));
  }
  return arrayForReturn;
}



//! ID



const getDB = async (id) => {
  const getGameDB = await Videogame?.findByPk(id);
  const promises = await getGameDB.getGenres();
  const genres = await Promise.all(promises);
  return genres
}

const getGameByPK = async (id) => {
  //* pedimos la tabla relacional
  const relationalTable = await getDB(id);
  const gameWithGenre = [];
      const genresName = [];
      relationalTable.map((el)=>{
          //* y tomamos cada uno de sus generos
          genresName.push(el.dataValues.name);
      })
      //* relacionamos a cada juego dentro de un obj con sus respectivo genero
      const obj = {
          genres : genresName,
          restOfData : await Videogame.findByPk(id)
      }
      gameWithGenre.push(obj);
  
  return gameWithGenre;
}

const getGameByID = async (id) => {
  //! isNaN trata de convertir lo que le pases a numero, si no se puede da true, si podria ser un number da false;
    if (isNaN(id)) {
      return await getGameByPK(id)    
    }
    return axios.get(`${API}/${id}?key=${APIKEY}`)
      .then(res => res.data)
      .catch(error => {
        throw new Error(error.message);
      });
  }

//!*********************************************************************************************!

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
 


module.exports = {
    getAllGamesAPI,
    getGameByID,
    getGamesByName,
    AUXgetAllGamesAPI,
    contador
}