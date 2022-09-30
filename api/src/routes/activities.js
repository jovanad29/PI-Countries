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


router.get('/', getActivities)
router.get('/:id', getActivityById)
router.post('/', postActivity)
router.post('/:a_id/countries/:c_id', addCountryToActivity)
router.put('/:id', updateActivity)
router.delete('/:a_id/countries/:c_id', removeCountryFromActivity)

module.exports = router
