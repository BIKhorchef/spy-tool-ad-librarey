const express = require('express');
const adsRoutes = require('./routes');

const router = express.Router();

router.use('/api', adsRoutes);

module.exports = router;
