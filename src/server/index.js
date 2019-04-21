//tao sever
var app = require('http').createServer()
//nhung them socket
var io = module.exports.io = require('socket.io')(app)
//dat port
const PORT = process.env.PORT || 3231
//trang xu ly sever SocketManager
const SocketManager = require('./SocketManager')
//Ket noi
io.on('connection', SocketManager);

app.listen(PORT, () => {
    console.log("Connected to port: " + PORT);
})