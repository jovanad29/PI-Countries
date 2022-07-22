
const { Country, Activity } = require('../db')
const { Op } = require('sequelize')

exports.getActivities = async (req,res) => {
    return res.json(await Activity.findAll({ include: [Country] }))
}

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
        return res.status(409).json({
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

exports.updateActivity = async (req,res) => {
    const { id, name,  difficulty, duration, season} = req.body
    if (!id || !name || !difficulty || !duration || !season){
        return res.status(400).json({
            error: {
                message: "id, name, difficulty, duration and season cannot be empty",
                values: {...req.body}
            }
        })
    }
    const activity = await Activity.update({
            name: name.split(" ").map( str => str[0].toUpperCase() + str.slice(1).toLowerCase()).join(" "),
            difficulty,
            duration,
            season
        },
        {
            where: {
                activity_id: id
            }
        }).catch(e => {
            return res.status(500).json({
                error: {
                    message: "Error while updating resource",
                    values: {...req.body}
                }
            })
        })
    return res.status(200).json(activity)
}

exports.removeCountryFromActivity = async (req, res) => {
    // console.log(await country.removeActivity(await Activity.findOne({where: {name: "actividad uno"}})))
    // console.log(await country.getActivities())
    const { c_id, a_id } = req.params
    const country = await Country.findByPk(c_id)
    if (!country) return res.status(404).json({
        error: {
            message: "Country doesn't exist",
            values: {c_id}
        }
    })
    const activity = await Activity.findByPk(a_id, {include: [Country]})
    if (!activity) return res.status(404).json({
        error: {
            message: "Activity doesn't exist",
            values: {a_id}
        }
    })
    await activity.removeCountry(country)
    return res.status(204).json({})
}
