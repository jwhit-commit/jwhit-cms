// Import dependencies 
const User = require('./user'); // Should file names be capitalized? VS showed error
const Post = require('./post');

// One-to-many relationship between user and posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Post };
