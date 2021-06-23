const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.view);
router.post('/', userController.find);



router.get('/addUser', userController.form);
router.post('/addUser', userController.create);


router.get('/editUser/:id', userController.edit);
router.post('/editUser/:id', userController.update);
router.get('/viewuser/:id', userController.viewall);
router.get('/:id',userController.delete);

module.exports = router;