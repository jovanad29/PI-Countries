const { Router } = require('express');
const { getCountries } = require('../controllers/getCountries');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries',getCountries)

module.exports = router;
