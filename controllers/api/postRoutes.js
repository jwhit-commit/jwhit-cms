// Import dependencies
const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new post (api/posts/)
router.post('/', withAuth, async (req, res) => {
  try {
    // New row in Post table
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Get specific post data
router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.param.id);
    res.json(postData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update specific post (api/posts/[id])
router.put('/:id', withAuth, async (req, res) => {
  try {
    //Update row in Post table
    const postData = await Post.update(
      {
        title: req.body.title,
        body: req.body.body,
      },
      {
      where: {
        id: req.params.id
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'This post no longer exists.' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update specific post (api/posts/[id])
router.delete('/:id', withAuth, async (req, res) => {
  try {
    //Delete row in Post table
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
