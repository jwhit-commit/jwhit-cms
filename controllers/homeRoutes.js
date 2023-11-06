const router = require('express').Router();
// const { User, Location, Station } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      res.render('home', { 
        logged_in: req.session.logged_in 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  module.exports = router;