const server = require('./api/server');

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`server running port: ${PORT}`)
})

//Pull your server into this file and start it!

