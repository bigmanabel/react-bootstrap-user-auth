require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/user');

const app = express();

// Middleware
app.use(cors({
  origin: '*'
}));
app.use(morgan('dev'));
app.use(express.json());


// Routes
app.use('/api/user', userRouter);


app.listen(5000, () => {
  console.log('Server started on port 5000');
})