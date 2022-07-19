
const { Country, Activity } = require('../db')

exports.getCountries = async (req,res) => {
    const countries = await Country.findAll({ include: [Activity] })
    .catch(e => console.log(e))
    return res.json(countries)
}