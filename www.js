const http = require('http')
const handleRouter = require('./app.js')

const server = http.createServer(handleRouter)
const PORT = process.env.PORT || 8000

server.listen(PORT)
console.log('服务器已经启动' + PORT)
