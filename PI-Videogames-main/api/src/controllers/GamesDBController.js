const { Genre, Videogame } = require('../db');
const { getAllGenres } = require("./GenreControllers");

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

const test = (genre) => {
  console.log("genre que llega por props a la func test",genre);
  const promises = genre?.map((genre) => {
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
  const promesa = Promise.all(promises)
  return promesa;
}



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
        const findedGenre = await test(genres.split(","))
        const id = await findedGenre?.map((genre) => genre[0].dataValues.id)
        id?.map(async(el)=>await Videogame.addGenres(el))
        // await Videogame.save()
    } else {
        //console.log('Se encontro el juego:', Videogame.toJSON());
    }
    return Videogame;
});
    return game;
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


// (async function(){
//   const dbGames =  await Videogame.findAll({        
//         include: [{
//           model: GenresDB,
//           attributes: ["name"],
//           through: {
//             attributes: []
//           }
//         }]
//       }
//   )
//   console.log(dbGames); 
// })()



//! NECESITAMOS UNA FUNCION QUE TRAIGA LOS JUEGOS DE LA BASE DE DATOS, QUE SE FIJE POR ID, A QUE JUEGO PERTENECE CADA GENERO Y VICEVERSA, PARA RENDERIZARLO

module.exports = {
  GenresDB,
  GamesPost,
  getAllGames,
};

