import User from '../models/User';

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });

        if (!user) {
            return res.status(400).json({ message: "Khoong tim thay nguoi dung" });
        }
        if (user.role === 0) {
            return res.status(400).json({ message: "Quyen truy cap bi tu choi" });
        }
        next();
    } catch (error) {
        res.status(500).json({err: err.message})
    }
}