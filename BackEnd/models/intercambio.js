import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const IntercambioSchema = new Schema({
    productoOfrecido: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    productoDeseado: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    usuarioOfrecido: { type: String},
    usuarioDeseado: { type: String},
    nombreSucursal: { type: String},
    dia: { type: String},
    estado: { type: String, enum: ['pendiente', 'aceptado', 'rechazado'], default: 'pendiente' },
    fecha: { type: Date}
})

export default model("PropuestaDeIntercambio", IntercambioSchema)