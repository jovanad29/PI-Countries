const { DataTypes } = require('sequelize');


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
			type: DataTypes.ENUM([ "1", "2", "3", "4", "5" ]),
			allowNull: false
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	})
};
