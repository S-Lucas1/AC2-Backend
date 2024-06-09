const express = require('express');
const cors = require('cors'); // Importar o pacote cors
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Habilitar CORS
app.use(cors());

// Conectar ao MongoDB
connectDB();

// Middleware para analisar o corpo das requisições
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Iniciar o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
