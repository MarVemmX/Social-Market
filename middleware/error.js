const ErrorResponse = require('../utils/errorResponse');

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    if (err.code === 11000) {
        const message = `Dữ liệu đã tồn tại`;
        error = new ErrorResponse(message, 400);
    }

    if (err.name === 'Validation sai') {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new ErrorResponse(message, 400);
    }

    console.log(error.message);

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message,
    });
};

module.exports = errorHandler;
