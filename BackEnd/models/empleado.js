import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const EmpleadoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    sucursal: {
        type: ObjectId,
        require: true
    },
    activo: { 
        type: Boolean,
        default: true
    },
    cantidadAceptados: {
        type: Number,
        default: 0
    },
    cantidadRechazados: {
        type: Number,
        default: 0
    }
})

export default model("Empleado", EmpleadoSchema)