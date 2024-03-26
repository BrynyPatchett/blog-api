const express = require('express')
const router = express.Router();
const userController = require("../controllers/userController")


router.get('/',userController.get_all_users)

router.post('/',userController.post_create_user)

router.post('/login', userController.login)

router.get('/:id',userController.get_user)

router.put('/:id', userController.put_update_user)

router.delete('/:id', userController.delete_user)

module.exports = router