const express = require('express');
const Action = require('./actions-model');

const {
    validateActionId,
    validateAction
} = require('./actions-middlware');

const router = express.Router();

router.get('/', (req, res, next) => {
    Action.get()
        .then(allActions => {
            res.status(200).json(allActions);
        })
        .catch(next)
})

router.get('/:id', validateActionId, (req, res, next) => {
    res.json(req.action)
})

module.exports = router;