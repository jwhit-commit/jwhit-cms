// Import dependencies
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Create new comment (api/comments/)
// router.post('/', withAuth, async (req, res) => {
router.post('/', async (req, res) => {
    console.log("api hit")
  try {
    // New row in Comment table
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
    // console.log(err);
  }
});

// Delete specific comment (api/comments/[id])
router.delete('/:id', withAuth, async (req, res) => {
  try {
    //Delete row in Comment table
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;