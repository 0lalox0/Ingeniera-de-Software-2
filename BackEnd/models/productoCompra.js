import { Schema, model } from 'mongoose'

const ProductoCompraSchema = new Schema({
    precio: {
        type: Number,
        require: true
    },
    nombreSucursal: {
        type: String,
        require: true
    },
    idEmpleado: {
        type: ObjectId,
        require: true
    },
    categoria: {
        type: String,
        require: true
    },
    fecha: {
        type: Date,
        require: true
    }
})

export default model("ProductosComprados", ProductoCompraSchema)