
const { Country, Activity } = require('../db')

exports.postActivity = async (req,res) => {
    const { name,  difficulty, duration, season, countries} = req.body
    if (!name || !difficulty || !duration || !season || !countries.length){
        return res.status(400).json({
            error: {
                msg: "name, difficulty, duration, season and countries cannot be empty",
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
    }).catch(e => res.status(500).json(e))
    countries.map( async c => {
        const country = await Country.findOne({ where: { country_id: c } })
        .catch(e => res.status(500).json(e))
        activity.addCountry(country)
    })
    return res.json(activity)
}
