import { Router } from 'express';
import ProdInterSchema from '../../models/productoIntercambio.js'

const router = Router()

//crear producto para intercambiar
router.post('/prodIntercambios', (req, res) => {
    console.log(req.body)
    const prod = ProdInterSchema(req.body)
    prod.save()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todos los productos
router.get('/prodIntercambios', (req, res) => {
    ProdInterSchema.find()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener un producto para intercambiar
router.get('/prodIntercambios/:id', (req, res) => {
    const { id } = req.params
    ProdInterSchema.findById(id)
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todos los productos de un usuario
router.get('/prodIntercambiosPorUsuario/:id', (req, res) => {
    const { id } = req.params
    ProdInterSchema.find({idUsuario: id})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})


//actualizar un producto
router.put('/prodIntercambios/:id', (req, res) => {
    const { id } = req.params
    const { titulo, descripcion, fotos, categoria, sucursal, inicioRango, finRango, idUsuario } = req.body
    ProdInterSchema.updateOne({ _id: id }, 
    {$set: { titulo, descripcion, fotos, categoria, sucursal, inicioRango, finRango, idUsuario }})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//eliminar un producto
router.delete('/prodIntercambios/:id', (req, res) => {
    const { id } = req.params
    ProdInterSchema.deleteOne( { _id: id })
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})


//eliminar todos los productos
router.delete('/eliminarTodosLosProductos', (req, res) => {
    ProdInterSchema.deleteMany()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})


// Obtener productos con filtros
router.get('/filtrarProdIntercambios', (req, res) => {
   
    const { titulo, categoria, sucursal } = req.query;
    const query = {};
  
    if (titulo) query.titulo = new RegExp(titulo, 'i'); // búsqueda insensible a mayúsculas/minúsculas
    if (categoria) query.categoria = new RegExp(categoria, 'i');
    if (sucursal) query.sucursal = sucursal;
  
    const items = ProdInterSchema.find(query)
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