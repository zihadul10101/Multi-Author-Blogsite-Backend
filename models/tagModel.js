const { Schema, model } = require('mongoose');

const tagSchema = new Schema({
    tagName: {
        type: String,
        require: true
    },
    tagSulg:{
        type: String,
        require: true
    },
    tagDescription: {
        type: String,
        require: true
    },
   
}, { timeseries: true })

module.exports = model('tag',tagSchema)