const router = require('express').Router();
const sequelize = require('../../config/connection');
const {
    Post,
    User,
    Vote
} = require('../../models');

// get all posts
router.get('/', (req, res) => {
    console.log('----HERE IS YOUR POSTS-----');
    Post.findAll({
            attributes: ['id', 'title', 'post', 'reference_url', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']],
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log('err', err);
            res.status(500).json(err);
        });
});

// Get one post
router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'title', 'post', 'reference_url', 'created_at', [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']],
            include: [{
                model: User,
                attributes: ['username']
            }]
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).json(err);
        });
});

// create a post
router.post('/', (req, res) => {
    Post.create({
            title: req.body.title,
            post: req.body.post,
            reference_url: req.body.reference_url,
            user_id: req.body.user_id
        })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log('err', err);
            res.status(500).json(err);
        });
});

// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
    Post.upvote(req.body, { Vote })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log('err', err);
        res.status(500).json(err);
      });
  });

// update a post title
router.put('/:id', (req, res) => {
    Post.update({
            title: req.body.title
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id!'
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).json(err);
        });
});

// Delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({
                    message: 'No post found with this id'
                });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log('err', err);
            res.status(500).json(err);
        });
});

module.exports = router;