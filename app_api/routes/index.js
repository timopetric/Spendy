const express = require('express');
const router = express.Router();

// controllers
const ctrlUser = require('../controllers/users');

// rest api for user (implement CRUD)
router.get('/users', ctrlUser.getAllUsers);
// router.get('/users/:userId', ctrlUser.getUserById);
// router.post('/users', ctrlUser.addUser);
// router.put('/users/:userId', ctrlUser.updateUser);
// router.delete('/users/:userId', ctrlUser.deleteUser);


module.exports = router;