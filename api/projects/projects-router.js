const express = require('express');
const Project = require('./projects-model');


const router = express.Router();

const {
    validateProject,
    validateProjectId
} = require('./projects-middleware');

router.get('/', (req, res, next) => {
    Project.get()
        .then(proj => {
            res.status(200).json(proj)
        })
        .catch(next)
})

router.get('/:id', validateProjectId, (req, res, next) => { //eslint-disable-line
    res.json(req.proj)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

router.put('/:id', validateProject, validateProjectId, (req, res, next) => {
    Project.update(req.params.id, req.body)
        .then(() => {
            return Project.get(req.params.id)
        })
        .then(updated => {
            res.status(200).json(updated)
        })
        .catch(next)
})

router.delete('/:id', validateProjectId, async (req, res, next) => {
    try{
        await Project.remove(req.params.id)
        res.json(req.proj)
    }
    catch(err) {
        next(err)
    }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
    try{
        const action = await Project.getProjectActions(req.params.id)
        res.json(action)
    }
    catch(err){
        next(err)
    }
})

module.exports = router;