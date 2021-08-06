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

router.get('/:id', validateActionId, (req, res, next) => { //eslint-disable-line
    res.json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(newAction => {
            res.status(201).json(newAction)
        })
        .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then(() =>{
            Action.get(req.params.id)
        })
        .then(updated => {
            res.json(updated)
        })
        .catch(next)
})

router.delete('/:id', validateActionId, async (req, res, next) =>{
    try{
        await Action.remove(req.params.id)
        res.json(req.action)
    }
    catch(err){
        next(err)
    }
})

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
        err: err.message,
        stack: err.stack
    })
})

module.exports = router;