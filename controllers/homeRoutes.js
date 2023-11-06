const router = require('express').Router();
const { User, Post } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll();

        const posts = dbPostData.map((post) =>
        post.get({ plain: true })
      );

        res.render('home', { 
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
  });

  module.exports = router;