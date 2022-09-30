
const { Country, Activity, Season } = require('../db')
const { Op } = require('sequelize')


exports.getCountries = async (req, res) => {
    try {
        const countries = await Country.findAll({
            include: {
                model: Activity, through: { attributes: [] },
                include: { model: Season, through: { attributes: [] } }
            },
            order: [
                [ 'name', 'ASC' ]
            ]
        })
        return res.status(200).json(countries)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"
            }
        })
    }
}

exports.getCountryByName = async (req, res) => {
    let { name } = req.query
    name = name.trim()
    try {
        const country = await Country.findAll({
            where: {
                name: {
                    [ Op.iLike ]: `${name}%`
                }
            },
            include: {
                model: Activity, through: { attributes: [] },
                include: { model: Season, through: { attributes: [] } }
            },
            order: [
                [ 'name', 'ASC' ]
            ]
        })
        if (country.length) return res.json(country)
        return res.status(404).json({
            error: {
                message: "Country doesn't exist",
                values: { ...req.query }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"
            }
        })
    }
}

exports.getCountryById = async (req, res) => {
    const { id } = req.params
    try {
        const country = await Country.findByPk(id.toUpperCase(), {
            include: {
                model: Activity, through: { attributes: [] },
                include: { model: Season, through: { attributes: [] } }
            }
        })
        if (country) return res.json(country)
        return res.status(404).json({
            error: {
                message: "Country doesn't exist",
                values: { ...req.params }
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"
            }
        })
    }
}

exports.addActivityToCountry = async (req, res) => {
    const { a_id, c_id } = req.params
    try {
        const country = await Country.findByPk(c_id, {
            include: {
                model: Activity, through: { attributes: [] },
                include: { model: Season, through: { attributes: [] } }
            }
        })
        if (!country) return res.status(404).json({
            error: {
                message: "Country doesn't exist",
                values: { c_id, a_id }
            }
        })
        const activity = await Activity.findByPk(c_id)
        if (!activity) return res.status(404).json({
            error: {
                message: "Activity doesn't exist",
                values: { c_id, a_id }
            }
        })
        await country.addActivity(activity)
        return res.status(204).json({})
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"
            }
        })
    }
}

exports.removeActivityFromCountry = async (req, res) => {
    const { c_id, a_id } = req.params
    try {
        const activity = await Activity.findByPk(a_id)
        if (!activity) return res.status(404).json({
            error: {
                message: "Activity doesn't exist",
                values: { a_id }
            }
        })
        const country = await Country.findByPk(c_id, {
            include: {
                model: Activity, through: { attributes: [] },
                include: { model: Season, through: { attributes: [] } }
            }
        })
        if (!country) return res.status(404).json({
            error: {
                message: "Country doesn't exist",
                values: { a_id }
            }
        })
        await country.removeActivity(activity)
        return res.status(204).json({})
    } catch (error) {
        console.log(error)
    }
}
