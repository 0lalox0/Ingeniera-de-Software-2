import { ObjectId } from 'mongodb'
import { Schema, model } from 'mongoose'

const ProdInterSchema = new Schema({
    titulo:{
        type: String,
        require: true
    },
    descripcion: {
        type: String,
    },
    fotos: {
        type: String,
    },
    categoria: {
        type: String,
        require: true
    },
    sucursal: {
        type: ObjectId,
        require: true
    },
    inicioRango: {
        type: String,
        require: true
    },
    finRango: {
        type: String,
        require: true
    },
    idUsuario: {
        type: String,
        require: true
    }, 
    nombre: {
        type: String,
        require: true
    },
    apellido: {
        type: String,
        require: true
    },
    urlFotos: {
        type: [String],
        require
    }
})

export default model("ProductosParaIntercambiar", ProdInterSchema)