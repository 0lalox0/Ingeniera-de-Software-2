import { Schema, model } from 'mongoose'

const SucursalSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    ciudad: {
        type: String,
        require: true
    },
    calle: {
        type: String,
        require: true
    },
    numero: {
        type: Number,
        require: true
    },
    horarioApertura: {
        type: Date,
        require: true
    },
    horarioCierre: {
        type: Date,
        require: true
    },
    dias: {
        type: String,
        require: true
    }

})

export default model('Sucursal', SucursalSchema)