require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db';
import errorHandler from './middleware/error';

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors({ origin: true }));

// Connecting Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));

// connect to mongodb
connectDB();

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 6969;

const server = app.listen(PORT, () => console.log(`Sever running on port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});
