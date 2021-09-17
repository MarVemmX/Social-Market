import multer from 'multer';
import path from 'path';

// Multer config
module.exports = multer({
    storage: multer.diskStorage({}),
    fileFilter: (req, file, cb) => {
        let extensionFile = path.extname(file.originalname); // lấy đuôi file
        if (extensionFile !== '.jpg' && extensionFile !== '.jpeg' && extensionFile !== '.png') {
            cb(new Error('Không hỗ trợ định dạng này'), false);
            return;
        }
        cb(null, true);
    },
});
