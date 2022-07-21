
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
            error: "Country doesn't exist",
            values: {...req.query}
    })
    return res.json(country)
}

exports.getCountryById = async (req,res) => {
    const { id } = req.params
    const country = await Country.findByPk(id.toUpperCase(),{include: [Activity]})
    if (country === null) return res.status(404).json({
        error: "Country doesn't exist",
        values: {...req.params}
    })
    return res.json(country)
}