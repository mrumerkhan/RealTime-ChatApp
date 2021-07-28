const express = require('express')
const app = express()
const http = require('http').createServer(app)
//const io = require('socket.io')(http);

// starting up server

const PORT = process.env.PORT || 3000

// listening server
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

// adding '/public' directory as '/' path for frontend
app.use(express.static(__dirname + '/public'))

// adding root route

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


// Socket 
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})
