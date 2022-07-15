
const { conn } = require('./src/db.js');

conn.sync({ force: true }).then(() => {
    console.log('Successful Sync'); // eslint-disable-line no-console
}).catch(error => console.error(error));