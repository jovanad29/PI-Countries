const { Router } = require('express');
const router = Router();
const {
    getCountries,
    getCountryByName,
    getCountryById,
    removeActivityFromCountry,
    addActivityToCountry
} = require('../controllers/countries');


router.get('/countries', (req,res) => {
    if (req.query.name){
        return getCountryByName(req,res)
    }
    return getCountries(req,res)
})
router.get('/countries/:id', getCountryById)
router.post('/countries/:c_id/activities/:a_id', addActivityToCountry)
router.delete('/countries/:c_id/activities/:a_id', removeActivityFromCountry)

module.exports = router
