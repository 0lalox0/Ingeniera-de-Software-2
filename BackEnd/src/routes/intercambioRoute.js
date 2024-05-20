import { Router } from 'express';
import IntercambioSchema from '../../models/intercambio.js'

const router = Router()

//crear intercambio
router.post('/propuestaIntercambio', (req, res) => {
    //console.log(req.body)
    const intercambio = IntercambioSchema(req.body)
    intercambio.save()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener los intercambios de los usuarios
router.get('/propuestaIntercambio', (req, res) => {
    IntercambioSchema.find()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})