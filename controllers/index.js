// Import dependencies
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes); //Routes browser URL requests
router.use('/api', apiRoutes); //Routes API requests

module.exports = router;
