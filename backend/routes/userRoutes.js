const express = require('express')
const {register,activateAccount, login, auth} = require('../controllers/userController')
const authUser = require('../middleware/auth')

const router = express.Router()

router.post('/register',register)
router.post('/activate',activateAccount)
router.post('/login',login)

module.exports = router