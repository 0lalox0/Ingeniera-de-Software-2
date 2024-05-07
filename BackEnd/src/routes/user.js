import { Router } from 'express';
const router = Router()

//create user
router.post('/users', (req, res) => {
    res.send("create user")
})

export default router;