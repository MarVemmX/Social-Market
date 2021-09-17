import crypto from 'crypto';
import ErrorResponse from '../utils/errorResponse';
import User from '../models/User';
import sendEmail from '../utils/sendEmail';
import jwt from 'jsonwebtoken';

// @desc    Login user
exports.login = async (req, res, next) => {
    const { username, password } = req.body;

    // Check if email and password is provided
    if (!username || !password) {
        return next(new ErrorResponse('Vui lòng nhập đủ username và password', 400));
    }

    try {
        // check username is exist
        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return next(new ErrorResponse('Username này không tồn tại', 401));
        }

        // check wrong password
        const isMatchPassword = await user.matchPassword(password);

        if (!isMatchPassword) {
            return next(new ErrorResponse('Sai mật khẩu ', 401));
        }
        // login thành công
        sendToken(user, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Register user
exports.register = async (req, res, next) => {
    const { username, email, password, name, phone, gender } = req.body;

    if (!username || !password || !name || !phone || !email || !gender) {
        // return res.status(400).json({ msg: 'Mời nhập các trường vào' });
        return next(new ErrorResponse('Vui lòng nhập các trường vào', 400));
    }

    const oldUser = await User.findOne({ username });

    if (oldUser) {
        // return res.status(401).json({ mgs: 'Username đã tồn tại trong database' });
        return next(new ErrorResponse('Username đã tồn tại trong db', 401));
    }
    try {
        const newUser = await User.create({
            username,
            email,
            password,
            name,
            phone,
            gender,
        });

        sendToken(newUser, 200, res);
    } catch (err) {
        next(err);
    }
};

// @desc    Forgot Password
exports.forgotPassword = async (req, res, next) => {
    // Send Email to email provided but first check if user exists
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return next(new ErrorResponse('No email could not be sent', 404));
        }

        // Reset Token Gen and add to database hashed (private) version of token
        const resetToken = user.getResetPasswordToken();

        await user.save();

        // Create reset url to email to provided email
        const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

        // HTML Message
        const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: message,
            });

            res.status(200).json({ success: true, data: 'Email Sent' });
        } catch (err) {
            console.log(err);

            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse('Email could not be sent', 500));
        }
    } catch (err) {
        next(err);
    }
};

// @desc    Reset User Password
exports.resetPassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return next(new ErrorResponse('Invalid Token', 400));
        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: 'Password Updated Success',
            token: user.getSignedJwtToken(),
        });
    } catch (err) {
        next(err);
    }
};

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ sucess: true, token, user });
};
