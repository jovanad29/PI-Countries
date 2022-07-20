
const { Country, Activity } = require('../db')

exports.postActivity = async (req,res) => {
    const { name,  difficulty, duration, season, countries} = req.body
    if (!name || !difficulty || !duration || !season || !countries.length){
        return res.status(400).json({
            error: {
                message: "name, difficulty, duration, season and countries cannot be empty",
                values: {
                    name,
                    difficulty,
                    duration,
                    season,
                    countries
                }
            }
        })
    }
    if ((await Activity.findAll({ where: {name:name} })).length){ // refactor
        return res.status(400).json({
            error:{
                message: `Activity "${name}" already exists`,
                values: {
                    name,
                    difficulty,
                    duration,
                    season,
                    countries
                }
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
                message: "Server Error",
                values: {
                    name,
                    difficulty,
                    duration,
                    season,
                    countries
                }
            }
        })
    })
    countries.forEach(async c => {
        const country = await Country.findOne({ where: { country_id: c } })
        if (country) activity.addCountry(country)
    });
    return res.status(201).json(activity)
}
