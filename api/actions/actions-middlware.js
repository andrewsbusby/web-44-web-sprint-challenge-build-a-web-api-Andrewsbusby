// add middlewares here related to actions
const Action = require('./actions-model');

async function validateActionId(req, res, next) {
    try{
        const action = await Action.get(req.params.id)
        if(!action) {
            res.status(404).json({message: 'action not found'})
        } else {
            req.action = action
            next()
        }
    }
    catch(err) {
        next(err)
    }
}

module.exports = {
    validateActionId,
}