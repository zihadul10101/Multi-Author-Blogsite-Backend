const { Schema, model } = require('mongoose');

const categorySchema = new Schema({
    categoryName: {
        type: String,
        require: true
    },
    categorySulg:{
        type: String,
        require: true
    },
    categoryDescription: {
        type: String,
        require: true
    },
   
}, { timeseries: true })

module.exports = model('category',categorySchema)