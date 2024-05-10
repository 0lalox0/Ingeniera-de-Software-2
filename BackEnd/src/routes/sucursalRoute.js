import { Router } from 'express';
import SucursalSchema from '../../models/sucursal.js'

const router = Router()

//crear sucursal
router.post('/sucursales', (req, res) => {
    const sucursal = SucursalSchema(req.body)
    sucursal.save()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todas las sucursales
router.get('/sucursales', (req, res) => {
    SucursalSchema.find()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener una sucursal
router.get('/sucursales/:id', (req, res) => {
    const { id } = req.params
    SucursalSchema.findById(id)
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//actualizar una sucursal
router.put('/sucursales/:id', (req, res) => {
    const { id } = req.params
    const { nombre, ciudad, calle, numero, horarioApertura, horarioCierre } = req.body
    SucursalSchema.updateOne({ _id: id }, 
        {$set: { nombre, ciudad, calle, numero, horarioApertura, horarioCierre }})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//eliminar una sucursal
router.delete('/sucursales/:id', (req, res) => {
    const { id } = req.params
    SucursalSchema.deleteOne( { _id: id })
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})


export default router;