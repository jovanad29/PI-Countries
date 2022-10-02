const axios = require('axios')
require('dotenv').config();


const fetch = axios.create({
    baseURL: process.env.REACT_APP_API || 'http://localhost:3001',
    // timeout: 1500
});
// instance.defaults.headers.common['x-api-key'] = process.env.API_KEY;
module.exports = fetch