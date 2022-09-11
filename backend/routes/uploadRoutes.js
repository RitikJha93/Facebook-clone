const express = require('express')
const uploadImages = require('../controllers/uploadcontroller')

const authUser = require('../middleware/auth')
const imageUpload = require('../middleware/imageUpload')

const router = express.Router()

router.post('/uploadImages',imageUpload, uploadImages)

module.exports = router