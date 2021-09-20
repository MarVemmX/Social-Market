import cloudinary from '../utils/cloudinary';
import ErrorResponse from '../utils/errorResponse';
import User from '../models/User';
import bcrypt from 'bcryptjs';

// @desc    Get info user --> [GET] /api/profile/:id
exports.getUserInfo = async (req, res, next) => {
    const { id } = req.params;

    try {
        let user = await User.findById({ _id: id });
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({ message: error.message });
    }
};

// @desc Update info user --> [PATCH] /api/profile/edit/:id
exports.updateUserInfo = async (req, res) => {
    const { id } = req.params;
    const { name, email, address, phone, gender } = req.body;
    try {
        let user = await User.findById(id);
        // field to update
        const data = {
            name: name || user.name,
            email: email || user.email,
            address: address || user.address,
            phone: phone || user.phone,
            gender: gender || user.gender,
        };
        // update query
        user = await User.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json({ message: 'Cập nhật thông tin thành công', user });
    } catch (err) {
        console.log(err); //tạm thời log ra lỗi
    }
};

// @desc Change avatar (get link to cloudinary) --> [PUT] /api/change-avatar/:id
exports.changeAvatar = async (req, res, next) => {
    try {
        let user = await User.findById(req.params.id);
        // Delete image from cloudinary
        await cloudinary.uploader.destroy(user.cloudinary_id);
        // Upload image to cloudinary
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        const data = {
            avatar: result?.secure_url || user.avatar,
            cloudinary_id: result?.public_id || user.cloudinary_id,
        };
        user = await User.findByIdAndUpdate(req.params.id, data, { new: true });
        res.json({ message: 'Cập nhật ảnh thành công', user });
    } catch (err) {
        console.log(err);
    }
};

exports.changePassword = async (req, res, next) => {
    // Compare token in URL params to hashed token
    // const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');
    // try {
    //     const user = await User.findOne({
    //         resetPasswordToken,
    //         // resetPasswordExpire: { $gt: Date.now() },
    //     });

    //     if (!user) {
    //         return next(new ErrorResponse('Invalid Token', 400));
    //     }

    //     user.password = req.body.password;
    //     user.resetPasswordToken = undefined;
    //     // user.resetPasswordExpire = undefined;

    //     await user.save();

    //     res.status(201).json({
    //         success: true,
    //         data: 'Password Updated Success',
    //         // token: user.getSignedJwtToken(),
    //     });
    // } catch (err) {
    //     next(err);
    // }

    const { newPassword, oldPassword, confirmPassword } = req.body;
    const { id } = req.params;

    // if (newPassword !== confirmPassword) {
    //     return next(new ErrorResponse('Mật khẩu mới không khớp', 422));
    // }

    let validPassword, newHashedPassword, user;
    try {
        user = await User.findById(id);
    } catch (err) {
        return next(new ErrorResponse('Try again', 500));
    }
    try {
        validPassword = await bcrypt.compare(oldPassword, user.password);
        newHashedPassword = await bcrypt.hash(newPassword, 10);
    } catch (err) {
        return next(new ErrorResponse('Try again', 500));
    }
    if (!validPassword) {
        return next(new ErrorResponse('Invalid inputs passed, please check your data', 422));
    }
    try {
        user.password = newHashedPassword;
    } catch (err) {
        return next(new ErrorResponse('nvalid inputs passed, please check your data', 422));
    }
    user.save();
    // api done
    res.status(200).json({ message: 'Đổi mật khẩu thành công' });
};
