
const { conn } = require('./src/db.js');
const { Country } = require('./src/db') 
const axios = require('axios')

conn.sync({ force: true }).then( async () => {
    try {
        const { data } = await axios.get('https://restcountries.com/v3/all')
        const countries = data.map(c => {
            return {
                country_id: c.cca3,
                name: c.name.common,
                flag_img: c.flags,
                continent: c.continents[0],
                capital: c.capital ? c.capital : ["N/A"], // some are undefined
                subregion: c.subregion, // some are undefined
                area: c.area,
                population: c.population
            }
        })
        await Country.bulkCreate(countries)        
    } catch (error) {
        console.log("Error con db")
        console.log(error)
    } finally{
        console.log(`${await Country.count()} rows added`)
        console.log('End of Sync')
    }
}).catch(e => {
    console.log("Error con sync")
    console.log(e)
});
