const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false
    },
    plataforms:{
      type:DataTypes.ARRAY(DataTypes.STRING),
      allowNull:false,
    },
    image:{
      type:DataTypes.STRING,
      allowNull:false,
      isUrl:true,
    },
    released:{
      type:DataTypes.STRING,
      allowNull:false,
    },
    rating:{
      type:DataTypes.FLOAT,
      allowNull:false,
    },
    createdInDB:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:true,
    },
  });
};

// MODELO 1 | Videogames

// ID (deben ser distintos a los que vienen de la API). *
// Nombre. *
// Descripción. *
// Plataformas. *
// Imagen. *
// Fecha de lanzamiento. *
// Rating. *

// 📍 MODELO 2 | Genres

// ID. *
// Nombre. *
