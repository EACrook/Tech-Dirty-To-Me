const router = require('express').Router();
const { User } = require('../../models');

router.get('/', (req, res) => {
    User.findAll()
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log('err', err)
    })
});

router.get('/:id', (req, res) => {
    User.findOne(
        where: {
            id: req.params.id
        })
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No user found with this id' })
            }
        })
});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;