import express from 'express'
import { createServer } from 'http'
import path from "path"
import { fileURLToPath } from "url"
import { dirname } from "path"
import { Server } from 'socket.io'

const app = express()
const server = createServer(app)
const Port = 3000
const io = new Server(server)

const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/mychat', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/html/MyChat.html'))
})

io.on('connection', (socket) => {
    console.log(`Um Usuário Conectado ID: ${socket.id}`)
    socket.on('disconnect', () => console.log(`Um Usuário se Desconectou ID: ${socket.id}`))
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log(`Usuário: ${msg.usuario}`)
        console.log(`Mensagem: ${msg.mensagem}`)
    })
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('nova_Mensagem', msg)
    })
})

server.listen(Port, () => {
    console.log(`Servidor Conectado...`)
})