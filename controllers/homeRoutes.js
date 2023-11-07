// Import dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
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
            order: [
                ['date_created', 'DESC'], //Most recent posts first
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
            order: [
                ['date_created', 'DESC'], //Most recent posts first
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

// Login page browser request route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the browser to dashboard page
    if (req.session.logged_in) {
        res.redirect('/dash');
        return;
    }

    // Render login.handlebars
    res.render('login');
});

router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: {all: true, nested: true}
      });
  
      const post = postData.get({ plain: true });

      let sameUser = false;
      if (post.user_id = req.session.user_id) {
        sameUser = true
      }
  
      res.render('post', {
        ...post,
        logged_in: req.session.logged_in,
        sameUser
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/post/:id/edit', async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: {all: true, nested: true}
      });
  
      const post = postData.get({ plain: true });
  
      res.render('edit', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;

sequelize.col()