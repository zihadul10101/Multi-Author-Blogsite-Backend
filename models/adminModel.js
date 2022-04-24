const { Schema, model } = require('mongoose');

const adminSchema = new Schema({
    adminname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        select: false
    },
    role: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    }
}, { timeseries: true })

module.exports = model('admin',adminSchema)