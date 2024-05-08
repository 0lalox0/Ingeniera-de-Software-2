import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true
        }
    }
)

//los modelos serían como las tablas en SQL (+ o -)
export default model('User', UserSchema)