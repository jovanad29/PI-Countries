
const { Country, Activity } = require('../db')

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
    if ((await Activity.findAll({ where: {name:name} })).length){ // refactor
        return res.status(400).json({
            error:{
                message: `Activity "${name}" already exists`,
                values: {...req.body}
            }
        })
    }
    const activity = await Activity.create({
        name,
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
        const getMethods = (obj) => Object.getOwnPropertyNames(obj)
        console.log(getMethods(country))
        // console.log(await activity.addCountry(country))
        if (country !== null) country.addActivity(activity)
    });
    return res.status(201).json(activity)
}
