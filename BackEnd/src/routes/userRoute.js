import { Router } from 'express';
import UserSchema from '../../models/user.js'

const router = Router()

//create user
router.post('/users', (req, res) => {
    const user = UserSchema(req.body)
    user.save().then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//get all users
router.get('/users', (req, res) => {
    UserSchema.find().then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//get a user
router.get('/users/:id', (req, res) => {
    const { id } = req.params
    UserSchema.findById(id)
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//update a user
router.put('/users/:id', (req, res) => {
    const { id } = req.params
    const { name, lastname, email, password, date } = req.body
    UserSchema.updateOne({ _id: id }, {$set: { name, lastname, email, password, date }})
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

//delete a user
router.delete('/users/:id', (req, res) => {
    const { id } = req.params
    UserSchema.deleteOne( { _id: id })
    .then((data) => res.json(data)).catch((error) => res.json({message: error}))
})


export default router;