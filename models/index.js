const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// create an association between post and user
User.belongsToMany(Post, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'user_id'
});

Post.belongsToMany(User, {
    through: Vote,
    as: 'voted_posts',
    foreignKey: 'post_id',
});

module.exports = { User, Post, Vote };