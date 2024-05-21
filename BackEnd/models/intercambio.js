import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const IntercambioSchema = new Schema({
    productoOfrecido: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    productoDeseado: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    usuarioOfrecido: { type: ObjectId, ref: 'User', required: true },
    usuarioDeseado: { type: ObjectId, ref: 'User', required: true },
    nombreSucursal: { type: String, required: true},
    dias: { type: String, require: true },
    estado: { type: String, enum: ['disponible', 'pendiente', 'listo', 'aceptado'], default: 'disponible' },
    fecha: { type: Date, default: Date.now }
})

export default model("PropuestaDeIntercambio", IntercambioSchema)