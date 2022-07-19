const mongoose = require('mongoose')

const documentSchema = new mongoose.Schema({
    documentID : {
        type : String,
        unique : true,
        required : true
    },
    data : Object,
    doumentName: {
        type: String,
        required: [true, 'please give the document a name'],
        default: 'Untitled Document'
    }
})

module.exports = mongoose.model('document', documentSchema)