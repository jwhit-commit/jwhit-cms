// Import dependencies
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes); // /api/users
router.use('/posts', postRoutes); // /api/posts

module.exports = router;
