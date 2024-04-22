const express = require('express');
const router = express.Router();
const {fetchAds} = require('./midlleware/ads/getads');

router.get('/ads', fetchAds);

module.exports = router;