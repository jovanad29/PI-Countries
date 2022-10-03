const { DataTypes } = require('sequelize');


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
					if (val.length !== 3) {
						throw Error('country id must be 3 uppercase letters')
					}
				}
			}
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		flag_img: {
			type: DataTypes.ARRAY(DataTypes.STRING),
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
			type: DataTypes.ARRAY(DataTypes.STRING),
			allowNull: false
		},
		subregion: {
			type: DataTypes.STRING,
			allowNull: true
		},
		area: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: true
			}
		},
		population: {
			type: DataTypes.INTEGER,
			allowNull: true,
			validate: {
				isNumeric: true
			}
		}
	});
};
