const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rota de Registro
router.post('/register', register);

// Rota de Login
router.post('/login', login);

module.exports = router;
