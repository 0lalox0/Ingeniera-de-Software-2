const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        lastname: {
            type: String
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String
        },
        date: {
            type: Date
        }
    }
)

//los modelos serían como las tablas en SQL (+ o -)
module.exports = mongoose.model('user', UserScheme)