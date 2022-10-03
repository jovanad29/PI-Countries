
const { Country, Activity, Season } = require('../db')
const { Op } = require('sequelize')


exports.getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll(
            {
                include: [
                    { model: Country, through: { attributes: [] } },
                    { model: Season, through: { attributes: [] } }
                ],
                order: [
                    [ 'name', 'ASC' ]
                ]
            })
        return res.json(activities)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"
            }
        })
    }
}

exports.getActivityById = async (req, res) => {
    const { id } = req.params
    try {
        const activity = await Activity.findByPk(id, {
            include: [
                { model: Country, through: { attributes: [] } },
                { model: Season, through: { attributes: [] } }
            ]
        })
        if (activity === null) return res.status(404).json({
            error: {
                message: "Activity doesn't exist",
                values: { ...req.params }
            }
        })
        return res.json(activity)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"
            }
        })
    }
}

exports.postActivity = async (req, res) => {
    const { name, difficulty, duration, seasons, countries } = req.body
    try {
        if (!name || !difficulty || !duration || !seasons.length || !countries.length) {
            return res.status(400).json({
                error: {
                    message: "name, difficulty, duration, season and countries cannot be empty",
                    values: { ...req.body }
                }
            })
        }
        const prevActivity = await Activity.findAll({
            where: {
                name: {
                    [ Op.iLike ]: `%${name}%`
                }
            }
        })
        if (prevActivity.length) {
            return res.status(409).json({
                error: {
                    message: `Activity "${name}" already exists`,
                    values: { ...req.body }
                }
            })
        }
        const activity = await Activity.create({
            name: name.split(" ").map(str => str[ 0 ].toUpperCase() + str.slice(1).toLowerCase()).join(" "),
            difficulty,
            duration
        }).catch(e => {
            return res.status(500).json({
                error: {
                    message: "Error while creating resource",
                    values: { ...req.body }
                }
            })
        })
        countries.forEach(async c => {
            const country = await Country.findByPk(c.toUpperCase())
            if (country) await country.addActivity(activity)
        });
        seasons.forEach(async s => {
            const season = await Season.findOne({ where: { name: s } })
            if (season) await season.addActivity(activity)
        });
        const newActivity = await Activity.findByPk(activity.activity_id, {
            include: [
                { model: Country, through: { attributes: [] } },
                { model: Season, through: { attributes: [] } }
            ]
        })
        return res.status(201).json(newActivity)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"
            }
        })
    }
}

exports.updateActivity = async (req, res) => {
    const { name, difficulty, duration, seasons } = req.body
    const { id } = req.params
    try {
        if (!id || !name || !difficulty || !duration || !seasons.length) {
            return res.status(400).json({
                error: {
                    message: "id, name, difficulty, duration and season cannot be empty",
                    values: { id, ...req.body }
                }
            })
        }
        await Activity.update(
            {
                name: name.split(" ").map(str => str[ 0 ].toUpperCase() + str.slice(1).toLowerCase()).join(" "),
                difficulty,
                duration
            },
            {
                where: {
                    activity_id: id
                }
            }
        )
        const updatedActivity = await Activity.findByPk(id, {
            include: [
                { model: Country, through: { attributes: [] } },
                { model: Season, through: { attributes: [] } }
            ]
        })
        seasons.forEach(async s => {
            console.log(s)
            try {
                const season = await Season.findOne({ where: { name: s } })
                if (season) await season.addActivity(updatedActivity)
            } catch (error) {
                console.log(error)
            }
        });
        return res.status(200).json(updatedActivity)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Error while updating resource",
                values: { id, ...req.body }
            }
        })
    }
}

exports.addCountryToActivity = async (req, res) => {
    const { a_id, c_id } = req.params
    try {
        const activity = await Activity.findByPk(a_id, {
            include: [
                { model: Country, through: { attributes: [] } },
                { model: Season, through: { attributes: [] } }
            ]
        })
        if (!activity) return res.status(404).json({
            error: {
                message: "Activity doesn't exist",
                values: { a_id, c_id }
            }
        })
        const country = await Country.findByPk(c_id)
        if (country === null) return res.status(404).json({
            error: {
                message: "Country doesn't exist",
                values: { a_id, c_id }
            }
        })
        await activity.addCountry(country)
        const newActivity = await Activity.findByPk(activity.activity_id, {
            include: [
                { model: Country, through: { attributes: [] } },
                { model: Season, through: { attributes: [] } }
            ]
        })
        return res.status(201).json(newActivity)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: {
                message: "Server error"
            }
        })
    }
}

exports.removeCountryFromActivity = async (req, res) => {
    const { c_id, a_id } = req.params
    try {
        const country = await Country.findByPk(c_id)
        if (!country) return res.status(404).json({
            error: {
                message: "Country doesn't exist",
                values: { c_id }
            }
        })
        const activity = await Activity.findByPk(a_id, {
            include: [
                { model: Country, through: { attributes: [] } },
                { model: Season, through: { attributes: [] } }
            ]
        })
        if (!activity) return res.status(404).json({
            error: {
                message: "Activity doesn't exist",
                values: { a_id }
            }
        })
        await activity.removeCountry(country)
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
