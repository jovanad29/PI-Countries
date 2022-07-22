const { Router } = require('express');
const { routes } = require('../app');
const {
    postActivity,
    updateActivity,
    removeCountryFromActivity,
    getActivities
} = require('../controllers/Activities');
const {
    getCountries,
    getCountryByName,
    getCountryById,
    removeActivityFromCountry
} = require('../controllers/countries');
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
router.delete('/countries/:c_id/activities/:a_id',removeActivityFromCountry)

routes.get('/activities', getActivities)
router.post('/activities', postActivity)
router.put('/activities/:id', updateActivity)
router.delete('/activities/:a_id/countries/:a_id',removeCountryFromActivity)



module.exports = router;
