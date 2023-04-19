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
      if (created) {
        console.log('Se creo un nuevo genero:', Genre.toJSON());
      } else {
        console.log('Se encontro el genero:', Genre.toJSON());
      }
      return genre;
    });
  });
  const results = await Promise.all(promises);
  return results;
};

const GamesPost = async (props) => {
  console.log("props",props);
  const {name,description,genres,plataforms,image,released,rating,createdInDB} = props;
  return Videogame.findOrCreate({
      where: {
        name: name,
        description: description,
        plataforms: [plataforms], //! del front viene como string
        image: image,
        released: new Date(released),
        rating: rating,
        createdInDB: createdInDB
      }
    }).then(([Videogame, created]) => {
      if (created) {
        console.log('Se creo un nuevo juego:', Videogame.toJSON());
      } else {
        console.log('Se encontro el juego:', Videogame.toJSON());
      }
      return Videogame;
  });
}

const Danger = (name) => {
 Videogame.destroy({
    where: {
      name:name
    }
  }).then(() => {
    console.log('Juego eliminado correctamente');
  }).catch((error) => {
    console.error('Error al eliminar el juego:', error);
  });
}

module.exports = {
  GenresDB,
  GamesPost,
};

