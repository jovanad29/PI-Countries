const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    country_id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
      unique: true,
      validate: {
        isAlpha: true,
        isUppercase: true,
        isThree: (val) => {
          if(val.length !== 3){
            throw Error('country id must be 3 uppercase letters')
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g
      }
    },
    flag_img: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING,
      validate: {
        is: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g
      }
    },
    area: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    },
    population: {
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true
      }
    }
  });
};
