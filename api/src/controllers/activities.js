
const { Country, Activity } = require('../db')
const { Op } = require('sequelize')

exports.postActivity = async (req,res) => {
    const { name,  difficulty, duration, season, countries} = req.body
    if (!name || !difficulty || !duration || !season || !countries.length){
        return res.status(400).json({
            error: {
                message: "name, difficulty, duration, season and countries cannot be empty",
                values: {...req.body}
            }
        })
    }
    const prevActivity = await Activity.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    })
    if (prevActivity.length){
        return res.status(400).json({
            error:{
                message: `Activity "${name}" already exists`,
                values: {...req.body}
            }
        })
    }
    const activity = await Activity.create({
        name: name.split(" ").map( str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(" "),
        difficulty,
        duration,
        season
    }).catch(e => {
        return res.status(500).json({
            error: {
                message: "Error while creating resource",
                values: {...req.body}
            }
        })
    })
    countries.forEach(async c => {
        const country = await Country.findByPk(c.toUpperCase())
        // console.log(await activity.addCountry(country))
        if (country !== null) country.addActivity(activity)
    });
    return res.status(201).json(activity)
}
