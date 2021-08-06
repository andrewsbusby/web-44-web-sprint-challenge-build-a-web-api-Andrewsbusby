const express = require('express');
const server = express();
const helmet = require('helmet');

const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());
server.use(helmet());

server.use('/api/actions', actionsRouter)

module.exports = server;
