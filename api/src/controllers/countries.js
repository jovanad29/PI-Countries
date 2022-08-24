
const { Country, Activity } = require('../db')
const { Op } = require('sequelize')

exports.getCountries = async (req,res) => {
    const countries = await Country.findAll({include: {
        model: Activity,
        attributes: ['activity_id', "name", "difficulty", "duration", "season"],
        through: { attributes: [] }
        },
        order: [
            ['name','ASC']
        ]
    })
    return res.status(200).json(countries)
}

exports.getCountryByName = async (req,res) => {
    let { name } =  req.query
    name = name.trim()
    const country = await Country.findAll({
        where: {
            name: {
                [Op.iLike]: `${name}%`
            }
        },
        include: {
            model: Activity,
            attributes: ['activity_id', "name", "difficulty", "duration", "season"],
            through: { attributes: [] }
        },
        order: [
            ['name','ASC']
        ]
    })
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
    try {
        const country = await Country.findByPk(id.toUpperCase(),{include: {
            model: Activity,
            attributes: ['activity_id', "name", "difficulty", "duration", "season"],
            through: { attributes: [] }
        }})
        if (country === null) return res.status(404).json({
            error: {
                message: "Country doesn't exist",
                values: {...req.params}
            }
        })
        return res.json(country)
    } catch (error) {
        console.log(error)
    }
}

exports.addActivityToCountry = async (req,res) => {
    const { a_id, c_id } = req.params
    const country = await Country.findByPk(c_id, {include: {
        model: Activity,
        attributes: ['activity_id', "name", "difficulty", "duration", "season"],
        through: { attributes: [] }
    }})
    if (country === null) return res.status(404).json({
        error : {
            message: "Country doesn't exist",
            values: {c_id,a_id}
        }
    })
    const activity = await Activity.findByPk(c_id)
    if (activity === null) return res.status(404).json({
        error : {
            message: "Activity doesn't exist",
            values: {c_id,a_id}
        }
    })
    await country.addActivity(activity)
    const newData = await Country.findByPk(country.country_id, {include: {
        model: Activity,
        attributes: ['activity_id', "name", "difficulty", "duration", "season"],
        through: { attributes: [] }
    }})
    return res.status(201).json(newData)
}

exports.removeActivityFromCountry = async (req, res) => {
    const { c_id, a_id } = req.params
    const activity = await Activity.findByPk(a_id)
    if (!activity) return res.status(404).json({
        error: {
            message: "Activity doesn't exist",
            values: {a_id}
        }
    })
    const country = await Country.findByPk(c_id, {include: {
        model: Activity,
        attributes: ['activity_id', "name", "difficulty", "duration", "season"],
        through: { attributes: [] }
    }})
    if (!country) return res.status(404).json({
        error: {
            message: "Country doesn't exist",
            values: {a_id}
        }
    })
    await country.removeActivity(activity)
    return res.status(204).json({})
}

exports.getHenry = async (req,res) => {
    try {
        const henryCountries = await Country.findAll({
            where: {
                [Op.iLike]: "%henry%"
            }
        })        
    } catch (error) {
        console.log(error)
    }
    return res.json(henryCountries)
}
