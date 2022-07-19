const { Router } = require('express');
const { postActivity } = require('../controllers/Activities');
const { getCountries, getCountryByName, getCountryById } = require('../controllers/countries');
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

router.post('/activities', postActivity)

module.exports = router;
