import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const IntercambioSchema = new Schema({
    productoOfrecido: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    productoDeseado: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    usuarioOfrecido: { type: String},
    usuarioDeseado: { type: String},
    nombreSucursal: { type: String},
    dia: { type: String},
    estado: { type: String, enum: ['pendiente', 'aceptado', 'rechazado', 'realizado', 'norealizado','rechazadoAutom'], default: 'pendiente' },
    fecha: { type: Date },
    calificoOfrecido: { type: Boolean, default: false },
    calificoDeseado: { type: Boolean, default: false },
    registrado: {type: Boolean, default: false}
})

export default model("PropuestaDeIntercambio", IntercambioSchema)