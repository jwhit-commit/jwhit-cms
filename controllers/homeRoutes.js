// Import dependencies
const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

// Home page browser request route
router.get('/', async (req, res) => {
    try {
        // Query for all posts
        const dbPostData = await Post.findAll({
            include: [
                {
                model: User,    //Find related User rows
                attributes: ['username'], //Include username column
                },
            ],
        });

        // Convert array data to plain objects
        const posts = dbPostData.map((post) =>
            post.get({ plain: true })
        );

        // Render home.handlebars
        res.render('home', { 
            posts, //include Posts data
            logged_in: req.session.logged_in //pass logged-in status to template enging
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Dashboard page browser request route
router.get('/dash', withAuth, async (req, res) => {
    try {
        // Query for all posts by logged-in user
        const dbPostData = await Post.findAll({ 
            where: { user_id: req.session.user_id },
            include: [
                {
                    model: User,    //Find related User rows
                    attributes: ['username'], //Include username column
                },
              ],
        });

            // Convert array data to plain objects
        const posts = dbPostData.map((post) =>
        post.get({ plain: true })
      );

        // Render dash.handlebars
        res.render('dash', { 
            posts, //include Posts data
            logged_in: req.session.logged_in //pass logged-in status to template enging
        });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the browser to dashboard page
    if (req.session.logged_in) {
        res.redirect('/dash');
        return;
    }

    // Render login.handlebars
    res.render('login');
});

module.exports = router;