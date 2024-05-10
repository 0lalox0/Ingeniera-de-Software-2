import { Router } from 'express';
import ProdInterSchema from '../../models/productoIntercambio.js'

const router = Router()

//crear sucursal
router.post('/prodIntercambios', (req, res) => {
    const prod = ProdInterSchema(req.body)
    prod.save()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todas las sucursales
router.get('/prodIntercambios', (req, res) => {
    ProdInterSchema.find()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener una sucursal
router.get('/prodIntercambios/:id', (req, res) => {
    const { id } = req.params
    ProdInterSchema.findById(id)
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//actualizar una sucursal
router.put('/prodIntercambios/:id', (req, res) => {
    const { id } = req.params
    const { titulo, descripcion, fotos, categoria, sucursal, inicioRango, finRango, idUsuario } = req.body
    ProdInterSchema.updateOne({ _id: id }, 
    {$set: { titulo, descripcion, fotos, categoria, sucursal, inicioRango, finRango, idUsuario }})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//eliminar una sucursal
router.delete('/prodIntercambios/:id', (req, res) => {
    const { id } = req.params
    ProdInterSchema.deleteOne( { _id: id })
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})


export default router;