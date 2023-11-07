// Import dependencies
const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');

router.use('/users', userRoutes); // /api/users
router.use('/posts', postRoutes); // /api/posts
router.use('/comments', commentRoutes); // /api/comments

module.exports = router;
