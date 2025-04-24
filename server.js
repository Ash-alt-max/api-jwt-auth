const express = require('express');

const sequelize = require('./config/database');
const addminRouter = require('./route/admin/admin'); // Import the admin route
const authRouter = require('./route/auth/auth');
const productsRouter = require('./route/products/products');
const app = express();
const port =  process.env.PORT || 5000;

// Middleware to parse JSON requests
app.use(express.json());
app.use('/api',addminRouter);
app.use('',authRouter);
app.use('', productsRouter);

sequelize.sync()
    .then(() => console.log('Database synchronized!'))
    .catch(err => console.error('Error synchronizing database:', err));

// main route
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
