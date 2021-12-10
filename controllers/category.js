import Category from '../models/Category';
import ErrorResponse from '../utils/errorResponse';

/**
 * @desc   get categoryId --> [GET] /api/category/:id
 * @access  Private, admin
 */
exports.categoryId = async (req, res, next, id) => {
    Category.findById(id, (err, category) => {
        if (err || !category) {
            return res.status(400).json({
                error: "Danh Muc Khong Ton Tai!"
            });
        }
        req.category = category;
        next();
    })
}

/**
 * @desc   Create new category --> [POST] /api/category/:id
 * @access  Private , admin
 */
exports.create = async (req, res) => {
    const { nameCategory } = req.body;
    const category = await Category.findOne({ nameCategory });

    if (category) {
        return next(new ErrorResponse('Danh Muc Da Ton Tai', 400));
    }
    
    try {
        const newCategory = await Category.create({
            nameCategory
        })
    } catch(err) {
        next(err);
    }
}

/**
 * @desc   Read category --> [GET] /api/category/:id
 * @access  Private , admin
 */
exports.read = async (req, res) => {
    return res.json(req.category);
}

/**
 * @desc   Update category --> [PUT] /api/category/:id
 * @access  Private , admin
 */
exports.update = async (req, res) => {
    // .....................
    // .....................
}

/**
 * @desc   Delete category --> [Delete] /api/category/:id
 * @access  Private , admin
 */
exports.delete = async (req, res) => {
    // .....................
    // .....................
}

/**
 * @desc   Get list category --> [GET] /api/category
 * @access  Private , admin
 */
exports.list = async (req, res) => {
     // .....................
    // .....................
}







