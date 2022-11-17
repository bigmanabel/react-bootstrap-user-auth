require('dotenv').config()

const express = require('express');
const morgan = require('morgan')

const userRouter = require('./routes/user');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use('/api/user', userRouter);


app.listen(5000, () => {
  console.log('Server started on port 5000');
})