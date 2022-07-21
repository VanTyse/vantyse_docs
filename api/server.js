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
const documentRoutes = require('./routes/documentRoutes')

//connect to mongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(console.log('done'))

app.use(express.json())
app.use('/api/v1/auth/', authRoutes)
app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/documents/', documentRoutes)


//function to find or create document
const findOrCreateDocument = async (documentID, userID, documentName) => {
    if (documentID == null)return
    const document = await Document.findOne({documentID})
    if (document) return document
    return await Document.create({documentID, creator: userID, documentName, data : ''})
}

//function to check if user can edit document
const canEdit = ({userID, creator, collaborators}) => {
    if (userID == null)return false
    console.log(creator.toString(), userID)
    console.log(collaborators.includes(userID), creator.equals(userID));
    return creator.equals(userID) || collaborators.includes(userID)
}

//initialize socket connection
io.on('connection', socket => {
    console.log('connected')
    socket.on('get-document', async (documentID, userID, documentName) => {
        const document = await findOrCreateDocument(documentID, userID, documentName)
        const {data, collaborators, creator, documentName : name} = document
        const canUserEdit = canEdit({userID, creator, collaborators})
        console.log(canUserEdit);
        //In the future I might decide to add a condition to join so that unauthorized users can't
        // subscribe to changes in real time
        socket.join(documentID)
        socket.emit('load-document', data, canUserEdit, name)
        socket.on('send-changes', delta => {
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
