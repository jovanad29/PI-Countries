const { Router } = require('express');
const router = Router();


router.get('/', (req, res) => res.send('¡Bienvenido al backend de este precioso proyecto!'))
router.use('/countries', require('./countries'))
router.use('/activities', require('./activities'))
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
