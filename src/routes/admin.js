const express = require('express')
const router = express.Router()
const Admin = require('../models/admin')
const Auth = require('../auth')

router.get('/', async (req, res) => {
    try {
        const admin = await Admin.find() 
        res.json(admin)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', getAdmin, (req, res) => {
    res.json(res.admin)
})

router.post('/', async (req, res) => {
    const admin = new Admin({
        password: req.body.password,
    })
    try {
        const newAdmin =  await admin.save()
        res.status(201).json(newAdmin)

    } catch (err) {
        res.status(400).json({message: err.message})
    }
    
})

router.delete('/:id', getAdmin, async (req, res) => {
    try {
        await res.admin.remove()
        res.json({ message: "Deleted Admin"})
        res.status(200)
    } catch (err) {
        res.status(500).json( { message: err.message })
    }
})

router.post('/login', Auth.login);
router.get('/checkToken/:token', Auth.checkToken);

async function getAdmin(req, res, next) {
    let admin
    try {
        admin = await Admin.findById(req.params.id)
        if (admin == null) {
            res.status(404).json({ message: 'Cannot find admin'})
        }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

    res.admin = admin
    next()
}


module.exports = router