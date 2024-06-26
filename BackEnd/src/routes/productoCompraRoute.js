import { Router } from 'express';
import ProductoCompraSchema from '../../models/productoCompra.js'

const router = Router()

//crear producto comprado
router.post('/productoCompra', (req, res) => {
    //console.log(req.body)
    const productoCompra = ProductoCompraSchema(req.body)
    productoCompra.save()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener los productos comprados
router.get('/productoCompra', (req, res) => {
    ProductoCompraSchema.find()
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

// Obtener productos comprados con filtros
router.get('/filtrarProductosCompra', (req, res) => {
   
    const { nombreSucursal, idEmpleado, categoria, fecha } = req.query;
    const query = {};
  
    if (nombreSucursal) query.nombreSucursal = nombreSucursal // búsqueda insensible a mayúsculas/minúsculas
    if (idEmpleado) query.idEmpleado = idEmpleado;
    if (categoria) query.categoria = categoria;
    if (fecha) query.fecha = fecha;
  
    const items = ProductoCompraSchema.find(query)
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todos los productos comprados de una sucursal
router.get('/productosCompra/:id', (req, res) => {
    const { id } = req.params
    ProductoCompraSchema.find({nombreSucursal: id})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todos los productos comprados que vendio en empleado
router.get('/productosCompraPorEmpleado/:id', (req, res) => {
    const { id } = req.params
    ProductoCompraSchema.find({idEmpleado: id})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todos los productos comprados de una categoria
router.get('/productosCompraPorCategoria/:id', (req, res) => {
    const { id } = req.params
    ProductoCompraSchema.find({categoria: id})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//obtener todos los productos comprados por una fecha especifica
router.get('/productosCompraPorFecha/:id', (req, res) => {
    const { id } = req.params
    ProductoCompraSchema.find({fecha: id})
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