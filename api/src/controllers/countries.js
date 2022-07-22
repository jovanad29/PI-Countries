
const { Country, Activity } = require('../db')
const { Op } = require('sequelize')

exports.getCountries = async (req,res) => {
    const countries = await Country.findAll({ include: [Activity] })
    return res.json(countries)
}

exports.getCountryByName = async (req,res) => {
    const country = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `${req.query.name}%`
            }
        },
        include: [{model: Activity}] //, attributes: {exclude: ['country_activity'] }}]
    }).catch(e => console.log(e))
    if (!country.length) return res.status(404).json({
        error: {
            message: "Country doesn't exist",
            values: {...req.query}
        }
    })
    return res.json(country)
}

exports.getCountryById = async (req,res) => {
    const { id } = req.params
    const country = await Country.findByPk(id.toUpperCase(),{include: [Activity]})
    if (country === null) return res.status(404).json({
        error: {
            message: "Country doesn't exist",
            values: {...req.params}
        }
    })
    return res.json(country)
}

exports.removeActivityFromCountry = async (req, res) => {
    // console.log(await country.removeActivity(await Activity.findOne({where: {name: "actividad uno"}})))
    // console.log(await country.getActivities())
    const { c_id, a_id } = req.params
    const activity = await Activity.findByPk(a_id)
    if (!activity) return res.status(404).json({
        error: {
            message: "Activity doesn't exist",
            values: {a_id}
        }
    })
    const country = await Country.findByPk(c_id, {include: [Activity]})
    if (!country) return res.status(404).json({
        error: {
            message: "Country doesn't exist",
            values: {a_id}
        }
    })
    await country.removeActivity(activity)
    return res.status(204).json({})
}
