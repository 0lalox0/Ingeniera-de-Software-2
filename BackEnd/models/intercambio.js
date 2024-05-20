import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const IntercambioSchema = new Schema({
    productoOfrecido: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    productoDeseado: { type: Schema.Types.ObjectId, ref: 'Producto', required: true },
    usuarioOfrecido: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    usuarioDeseado: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    estado: { type: String, enum: ['pendiente', 'aceptado', 'rechazado'], default: 'pendiente' },
    fecha: { type: Date, default: Date.now }
})

export default model("PropuestaDeIntercambio", IntercambioSchema)