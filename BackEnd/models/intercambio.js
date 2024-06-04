import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const IntercambioSchema = new Schema({
    productoOfrecido: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
    productoDeseado: { type: ObjectId, ref: 'ProductosParaIntercambiar', required: true },
   /* usuarioOfrecido: { type: ObjectId, ref: 'User'},
    usuarioDeseado: { type: ObjectId, ref: 'User'},
    nombreSucursal: { type: String},
    dia: { type: String},
    estado: { type: String, enum: ['pendiente', 'aceptado', 'rechazado'], default: 'pendiente' },
    fecha: { type: Date}*/
})

export default model("PropuestaDeIntercambio", IntercambioSchema)