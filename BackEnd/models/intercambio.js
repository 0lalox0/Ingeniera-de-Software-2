import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const IntercambioSchema = new Schema({
    productoOfrecido: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    productoDeseado: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    usuarioOfrecido: { type: ObjectId, ref: 'User', required: true },
    usuarioDeseado: { type: ObjectId, ref: 'User', required: true },
    nombreSucursal: { type: String, required: true},
    dia: { type: String, require: true },
    estado: { type: String, enum: ['pendiente', 'aceptado', 'rechazado'], default: 'pendiente' },
    fecha: { type: Date, require: true }
})

export default model("PropuestaDeIntercambio", IntercambioSchema)