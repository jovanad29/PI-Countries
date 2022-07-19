
const { conn } = require('./src/db.js');
const { Country } = require('./src/db') 
const axios = require('axios')

conn.sync({ force: true }).then( async () => {
    const { data } = await axios.get('https://restcountries.com/v3/all')
    .catch(error => console.log(error))
    const countries = data.map(c => {
        return {
            country_id: c.cca3,
            name: c.name.common,
            flag_img: c.flags[1], // .png
            continent: c.continents[0],
            capital: c.capital ? c.capital : ["N/A"], // some are undefined
            subregion: c.subregion, // ? c.subregion : console.log(c.name.common),
            area: c.area,
            population: c.population
        }
    })
    Country.bulkCreate(countries) // refactorizar
    .then(data => console.log(JSON.stringify(data,null,2)))
    .catch(e => console.log(e))
    console.log('Successful Sync');
});