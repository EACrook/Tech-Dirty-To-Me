const User = require('./User');
const Post = require('./Post');

// create an association between post and user
User.hasMany(Post, {
    foreignKey: 'user_id'
})

Post.belongsTo(User, {
    foreignKey: 'user_id',
})

module.exports = { User, Post };