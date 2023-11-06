const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            include: [
              {
                model: User,
                attributes: ['username'],
              },
            ],
          });

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


router.get('/dash', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({ 
            where: { user_id: req.session.user_id },
            include: [
                {
                  model: User,
                  attributes: ['username'],
                },
              ],
        });

        const posts = dbPostData.map((post) =>
        post.get({ plain: true })
      );

        res.render('dash', { 
            posts,
            logged_in: req.session.logged_in 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/dash');
    return;
  }

  res.render('login');
});

module.exports = router;