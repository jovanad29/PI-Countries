const { Router } = require('express');
const { getCountries, getCountryByName, getCountryById } = require('../controllers/getCountries');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/countries', (req,res) => {
    if (req.query.name){
        return getCountryByName(req,res)
    }
    return getCountries(req,res)
})

router.get('/countries/:id',getCountryById)

module.exports = router;
