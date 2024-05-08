import { Router } from 'express';
import UserSchema from '../../models/user.js'

const router = Router()

//create user
router.post('/users', (req, res) => {
    const user = UserSchema(req.body)
    user.save().then((data) => res.json(data)).catch((error) => res.json({message: error}))
})

export default router;