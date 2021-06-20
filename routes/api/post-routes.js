const router = require('express').Router();
const { Post, User } = require('../../models');

// get all posts
router.get('/', (req, res) => {
    console.log('----HERE IS YOUR POSTS-----');
    Post.findAll ({
        attributes: ['id', 'title', 'post', 'reference_url', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
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
        attributes: ['id', 'title', 'post', 'reference_url', 'created_at'],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
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

// update a post title
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'No post found with this id!' });
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
            res.status(404).json({ message: 'No post found with this id' });
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