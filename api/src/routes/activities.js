const { Router } = require('express');
const router = Router();
const {
    postActivity,
    updateActivity,
    removeCountryFromActivity,
    getActivities,
    getActivityById,
    addCountryToActivity
} = require('../controllers/activities');


router.get('/activities', getActivities)
router.get('/activities/:id', getActivityById)
router.post('/activities', postActivity)
router.post('/activities/:a_id/countries/:c_id', addCountryToActivity)
router.put('/activities/:id', updateActivity)
router.delete('/activities/:a_id/countries/:c_id', removeCountryFromActivity)

module.exports = router
