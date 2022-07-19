//initializing express
require('express-async-errors')
const express = require('express');
const app = express()

//creating the express server using http.createServer
const {createServer} = require('http');
const server = createServer(app);

//adding socket.io to the already created server
const {Server} = require('socket.io');
const io = new Server(server, {
    cors : {
        origin : 'http://localhost:3000',
        methods : ['GET', 'POST']
    }
})

//other initializations
require('dotenv').config()
const mongoose = require('mongoose')
const Document = require('./models/document')
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(console.log('done'))


//function to find or create document
const findOrCreateDocument = async (documentID) => {
    if (documentID == null)return
    const document = await Document.findOne({documentID})
    console.log(document)
    if (document) return document
    return await Document.create({documentID, data : ''})
}

app.use(express.json())
app.use('/api/v1/auth/', authRoutes)
app.use('/api/v1/users/', userRoutes)




//initialize server connection
io.on('connection', socket => {
    console.log('connected')
    socket.on('get-document', async documentID => {
        const document = await findOrCreateDocument(documentID)
        const {data} = document
        socket.join(documentID)
        socket.emit('load-document', data)
        socket.on('send-changes', delta => {
            console.log(delta);
            socket.broadcast.to(documentID).emit('receive-changes', delta)
        })

        socket.on('save-document', async data => {
            await Document.findOneAndUpdate({documentID}, {data})
        })
    })
})


//start server and define port to listen on
server.listen(3001, () => {
    console.log('server connected to port 3001')
})
