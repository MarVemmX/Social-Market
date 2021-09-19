const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false, // true là lỗi findByIdAndUpdate
        });

        console.log('MongoDB Connected');
    } catch (err) {
        console.log(err);
    }
};

module.exports = connectDB;
