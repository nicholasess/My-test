import koa from 'koa';
import http from 'http'
import logger from 'koa-logger';
import json from 'koa-json';
import route from 'koa-router';
import bodyParse from 'koa-bodyparser'
import cors from 'koa-cors';
import routes from './src/routes/userRoutes'
import mongoose from 'mongoose'
import socket from 'socket.io'

//init app's
const app = new koa();
const router = new route();
const server = http.createServer(app.callback())
const io = new socket(server)
//middlewares
app.use(cors());router
app.use(bodyParse());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(logger());
app.use(json());

routes(router)

io.on('connection', socket => {
    socket.on('envBackend', data => {
        console.log(data)
        socket.broadcast.emit('envFrontend', {nome: data.nome, comentario: data.comentario, verif: true})
    })
})

mongoose.connect('mongodb://localhost:27017/globo');

server.listen(3001, () => console.log('server On http://localhost:3001'));
