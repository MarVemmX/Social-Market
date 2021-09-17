import cloudinary from '../utils/cloudinary';
import upload from '../utils/multer';
import ErrorResponse from '../utils/errorResponse';
import User from '../models/User';

// @desc    Get info user
exports.getUserInfo = async (req, res, next) => {
    // const { id } = req.params;

    try {
        const user = await User.findById({ _id: req.params.id });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
};
// @desc Update info user ()
exports.updateUserInfo = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, gender } = req.body;
    try {
        // let user = await User.findById(req.params.id);
        // Delete default image from cloudinary
        await cloudinary.uploader.destroys(user.cloudinary_id);
        // Upload image to cloudinary
        let result;
        if (req.file) {
            result = await cloudinary.uploader.upload(req.file.path);
        }
        // field to update
        const data = {
            name: name || user.name,
            avatar: result?.secure_url || user.avatar,
            cloudinary_id: result?.public_id || user.cloudinary_id,
            email: email || user.email,
            phone: phone || user.phone,
            gender: gender || user.gender,
        };
        // update query
        const user = await User.findByIdAndUpdate(id, data, { new: true });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
};
