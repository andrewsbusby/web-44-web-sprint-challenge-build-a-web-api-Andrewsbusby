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

router.get('/:id', validateProjectId, (req, res, next) => {
    res.json(req.proj)
})

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(newProject => {
            res.status(201).json(newProject)
        })
        .catch(next)
})

module.exports = router;