
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