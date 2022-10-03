
const { conn } = require('../src/db.js');
const { Country, Season } = require('../src/db')
const axios = require('axios');

conn.sync({ force: true }).then(async () => {
    try {
        const { data } = await axios.get('https://restcountries.com/v3/all')
        const countries = data.map(c => {
            return {
                country_id: c.cca3,
                name: c.name.common,
                flag_img: c.flags,
                continent: c.continents[ 0 ],
                capital: c.capital ? c.capital : [ "N/A" ], // some are undefined
                subregion: c.subregion, // some are undefined
                area: c.area,
                population: c.population
            }
        })
        await Country.bulkCreate(countries)
    } catch (error) {
        console.log("Error while adding countries")
        console.log(error)
    } finally {
        console.log(`${await Country.count()} countries added`)
    }
    try {
        const seasons = [
            { name: 'Summer', icon: 'https://i.ibb.co/9Ym2qRm/sun.png' },
            { name: 'Fall', icon: 'https://i.ibb.co/1Jjvwjq/autumn-tree-leaves.png' },
            { name: 'Winter', icon: 'https://i.ibb.co/Y7wRg9V/snowflake.png' },
            { name: 'Spring', icon: 'https://i.ibb.co/tzR6Y24/sakura.png' }
        ]
        seasons.forEach(async s => await Season.create({ name: s.name, icon: s.icon }))
    } catch (error) {
        console.log("Error while adding seasons")
        console.log(error)
    }
    console.log('End of synchronization')
}).catch(e => {
    console.log("Error while synchronizing")
    console.log(e)
});