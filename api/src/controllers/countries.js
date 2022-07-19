
const { Country, Activity } = require('../db')

exports.getCountries = async (req,res) => {
    const countries = await Country.findAll({ include: [Activity] })
    .catch(e => console.log(e))
    return res.json(countries)
}

exports.getCountryByName = async (req,res) => {
    const country = await Country.findOne({
        where: { name: req.query.name },
        include: [Activity]
    }).catch(e => console.log(e))
    return res.json(country)
}

exports.getCountryById = async (req,res) => {
    const { id } = req.params
    const country = await Country.findOne({
        where: {country_id: id},
        include: [Activity]
    }).catch(e => console.log(e))
    return res.json(country)
}