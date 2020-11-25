const express = require('express');
const router = express.Router();

// controllers
const ctrlUser = require('../controllers/users');

// rest api for user (implement CRUD)
router.get('/v1/users', ctrlUser.getAllUsers);
router.post('/v1/users', ctrlUser.addUser);
router.post('/v1/groups', ctrlUser.addGroup);
// router.get('/v1/users/:userId', ctrlUser.getUserById);
// router.put('/v1/users/:userId', ctrlUser.updateUser);
// router.delete('/v1/users/:userId', ctrlUser.deleteUser);


module.exports = router;