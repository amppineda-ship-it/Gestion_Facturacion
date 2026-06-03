require('dotenv').config();

const express = require('express');
const app     = express();
const PORT    = process.env.PORT || 3000;

app.use(express.json());

const authRoutes          = require('./src/routes/auth.routes');
const transferenciaRoutes = require('./src/routes/transferencia.routes');

app.use('/api/auth',           authRoutes.default          || authRoutes);
app.use('/api/transferencias', transferenciaRoutes.default || transferenciaRoutes);

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando ✅' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});