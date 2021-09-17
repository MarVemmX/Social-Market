import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter your username'],
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        match: [
            // regex
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            '  Vui lòng nhập đúng định dạng email',
        ],
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: 6,
        select: false,
    },
    name: {
        type: String,
        required: [true, 'Please enter your name.'],
    },
    phone: {
        type: Number,
        maxlength: 12,
        required: [true, 'Please enter your phone.'],
    },
    gender: {
        type: String,
        required: [true, 'Please enter your gender.'],
    },
    avatar: {
        type: String,
        // default: 'https://res.cloudinary.com/dxnfxl89q/image/upload/v1612713326/fullauth/pkvlumfwc2nxtdnwcppk.jpg',
    },
    cloudinary_id: {
        type: String,
    },
    star_vote: {
        type: Number,
        default: 0,
    },
    role: {
        type: Number,
        default: 0, // 0 is user, 1 is admin
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordExpire: {
        type: Date,
    },
});

// mã hóa mật khẩu
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//so sánh password khi nhập có giống password có trong db
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
    // Create JWT
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

UserSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString('hex');

    // hash token and save to db
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // time expire token
    this.resetPasswordExpire = Date.now() + 5 * (60 * 1000); // 5 Minutes

    return resetToken;
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
