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

// Cho phép lấy dữ liệu từ form method POST
app.use(express.urlencoded({ extended: true }));

// Add headers before the routes are defined
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request headers you wish to allow

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Connecting Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/private', require('./routes/private'));
app.use('/api/profile', require('./routes/profile'));
app.use('api/category', require('./routes/category'));

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
