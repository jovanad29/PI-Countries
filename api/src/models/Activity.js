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
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[ a-zA-ZÀ-ÿ\u00f1\u00d1]*$/g
      }
    },
    difficulty: {
        type: DataTypes.ENUM(['1', '2', '3', '4', '5']),
        allowNull: false
    },
    duration: { // en días? en horas?
      type: DataTypes.INTEGER,
      allowNull: false
    },
    season: {
      type: DataTypes.ENUM(['Summer', 'Fall', 'Winter', 'Spring']),
      allowNull: false
    }
  });
};
