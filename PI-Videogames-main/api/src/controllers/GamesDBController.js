const { Genre, Videogame } = require('../db');
const { getAllGenres } = require("./GenreControllers");
const { Op } = require ('sequelize');

async function searchByName(name){
  try{
    const results = await Videogame?.findAll({
    where: {
      name: {
        [Op.like]: `%${name}%`
      }
    }
  });
  return results;
}catch(error) {
  throw new Error(error.message);
}
}


//* genre creator
const GenresDB = async () => {
  const genres = await getAllGenres();
  const promises = genres.map((genre) => {
    return Genre.findOrCreate({
      where: {
        name: genre
      }
    }).then(([Genre, created]) => {
      if (created ) {
        //console.log('Se creo un nuevo genero:', Genre.toJSON());
        return Genre.save().then(() => genre);
      } else {
        //console.log('Se encontro el genero:', Genre.toJSON());
        return genre;
      }
    });
  });
  const results = await Promise.all(promises);
  return results;
};

//!////////////////////////////////////////////////////////////////////////////////////////////////!
//!esta funcion se fija en la base de datos de generos, cual genero tiene cada juego nuevo que creamos
const genreFinder = async (genre) => {
  const promises = await genre?.map((genre) => {
    return Genre.findOrCreate({
      where: {
        name: genre
      }
    })
  })
  return Promise.all(promises);
}


const getAllGames = async () => {
  const promises = await Videogame?.findAll();
  const promesa = Promise.all(promises);
  return promesa;
}

//!////////////////////////////////////////////////////////////////////////////////////////////////!

const GamesPost = async (props) => {
  const {name,description,genres,plataforms,image,released,rating,createdInDB} = props;
  const game = await Videogame.findOrCreate({
    where: {
        name: name,
        description: description,
        plataforms: [plataforms], //! del front viene como string
        image: image,
        released: new Date(released),
        rating: rating,
        createdInDB: createdInDB
    }
}).then(async([Videogame, created]) => {
    if (created) {
        //console.log('Se creo un nuevo juego:', Videogame.toJSON());
        //* se fija que generos tiene el juego
        const findedGenre = await genreFinder(genres.split(","))
        //*guarda los id de cada uno en un array 
        const id = await findedGenre?.map((el) => el[0].dataValues.id)
        console.log(id);
        //* por cada genero, relaciona el id del juego con los generos en la base intermedia
        id?.map(async(el)=>await Videogame.addGenres(el))
        await Videogame.save()
    } else {
        console.log('Se encontro el juego:', Videogame.toJSON());
    }
    return Videogame;
});
    return game;
}

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




// const Danger = (name) => {
//  Videogame.destroy({
//     where: {
//       name:name
//     }
//   }).then(() => {
//     //console.log('Juego eliminado correctamente');
//   }).catch((error) => {
//     //console.error('Error al eliminar el juego:', error);
//   });
// }

module.exports = {
  GenresDB,
  GamesPost,
  getAllGames,
  searchByName,
  getGamesByPK
};



