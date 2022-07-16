const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    activity_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      unique: true,
      defaultValues: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g
      }
    },
    difficulty: {
        type: DataTypes.INTEGER,
        validate: {
            isInRange: (val) => {
                if (val < 1 || val > 5){
                    throw Error('difficulty must be a value between 1 and 5')
                }
            }
        }
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    season: {
      type: DataTypes.ENUM(['Summer', 'Fall', 'Winter', 'Spring']),
      allowNull: false
    }
  });
};
