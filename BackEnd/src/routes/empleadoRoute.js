import { Router } from 'express';
import EmpleadoSchema from '../../models/empleado.js'

const router = Router()

//create user
router.post('/empleados', (req, res) => {
    const user = EmpleadoSchema(req.body)
    user.save().then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//get all empleados
router.get('/empleados', (req, res) => {
    EmpleadoSchema.find().then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//get a empleado
router.get('/empleados/:id', (req, res) => {
    const { id } = req.params
    EmpleadoSchema.findOne({email: id})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//get empleado por dni
router.get('/empleadosDNI/:id', (req, res) => {
    const { dni } = req.params
    EmpleadoSchema.findOne({dni: dni})
    .then((data) => res.json(data)).catch(() => null)
})

//update a empleado
router.put('/empleados/:id', (req, res) => {
    const { id } = req.params
    const { nombre, apellido, dni, email, telefono, sucursal, activo } = req.body
    EmpleadoSchema.updateOne({ email: id }, 
    {$set: { nombre, apellido, dni, email, telefono, sucursal, activo }})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//delete a empleado
router.delete('/empleados/:id', (req, res) => {
    const { id } = req.params
    EmpleadoSchema.deleteOne( { email: id })
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//get empleados por sucursal
router.get('/empleados/sucursal/:idSucursal', (req, res) => {
    const { idSucursal } = req.params
    EmpleadoSchema.find({sucursal: idSucursal})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//Config seguridad
router.use((req, res, next) => {
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