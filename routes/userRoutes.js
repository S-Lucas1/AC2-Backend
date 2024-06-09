const express = require('express');
const router = express.Router();
const { getUsers, getUserById, updateUser, deleteUser, getUsersByRole } = require('../controllers/userController');
const auth = require('../middlewares/auth');

router.get('/', auth, getUsers);
router.get('/:id', auth, getUserById);
router.put('/:id', auth, updateUser);
router.delete('/:id', auth, deleteUser);
router.get('/roles/count', auth, getUsersByRole);

module.exports = router;
