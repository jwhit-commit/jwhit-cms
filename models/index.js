// Import dependencies 
const User = require('./User'); 
const Post = require('./Post');
const Comment = require('./Comment');

// One-to-many relationship between user and posts
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User);

// One-to-many relationship between user and comments
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User);

// One-to-many relationship between post and comments
Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post);

module.exports = { User, Post, Comment };
