// Import dependencies
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

// Arrays of seed data
const userData = require('./userData.json');
const postData = require('./postData.json');
const commentData = require('./commentData.json');

// Create rows
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    await Post.create({
      ...post,
    });
  };

  for (const comment of commentData) {
    await Comment.create({
      ...comment,
    });
  };

  process.exit(0);
};

seedDatabase();
