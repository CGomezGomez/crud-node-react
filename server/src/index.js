const port = 3000;
const express = require('express');
const app = express();
const cors = require('cors'); 
const userRoutes = require('./routes/users.routes');

// Rutas

// Middlewares para cliente
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);

// Uso de rutas

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

