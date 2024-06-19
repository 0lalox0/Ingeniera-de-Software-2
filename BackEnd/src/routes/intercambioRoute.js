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

//actualizar un intercambio
router.put('/propuestaIntercambio/:id', (req, res) => {
    const { id } = req.params
    const { productoOfrecido, productoDeseado, usuarioOfrecido, usuarioDeseado, estado, fecha, calificoOfrecido, calificoDeseado } = req.body
    IntercambioSchema.updateOne({ _id: id }, 
    {$set: { productoOfrecido, productoDeseado, usuarioOfrecido, usuarioDeseado, estado, fecha, calificoOfrecido, calificoDeseado }})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//eliminar un intercambio
router.delete('/propuestaIntercambio/:id', (req, res) => {
    const { id } = req.params
    IntercambioSchema.deleteOne( { _id: id })
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//eliminar todos los intercambios
router.delete('/eliminarTodosLosIntercambios', (req, res) => {
    IntercambioSchema.deleteMany()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

// Obtener intercambios con filtros
router.get('/filtrarPropuestaIntercambios', (req, res) => {
   
    const { usuarioOfrecido, usuarioDeseado, estado } = req.query;
    const query = {};
  
    if (usuarioOfrecido) query.usuarioOfrecido = usuarioOfrecido // búsqueda insensible a mayúsculas/minúsculas
    if (usuarioDeseado) query.usuarioDeseado = usuarioDeseado;
    if (estado) query.estado = estado;
  
    const items = IntercambioSchema.find(query)
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todos los intercambios de una sucursal
router.get('/propuestas/:id', (req, res) => {
    const { id } = req.params
    IntercambioSchema.find({nombreSucursal: id})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//config de seguridad
router.use((req, res, next) => {  //todo esto
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
const errorHandler = (err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
};
router.use(errorHandler);
export default router;