import Category from '../models/Category';


exports.createNewCategory = async (req, res) => {
    const { nameCategory } = req.body;
    const category = await Category.findOne({ nameCategory });

    if (category) {
        return next(new ErrorResponse('Danh Muc Da Ton Tai', 400));
    }
    const newCategory = await Category.create({
        nameCategory
    });

    return res.status(200).json({ message: 'Them danh muc thanh cong', newCategory });
   
}

/**
 * @desc   Get list category --> [GET] /api/category
 * @access  Private , admin
 */
exports.getListCategory =  async (req, res) => {
    // Category.find({}, (err, categories) => {
    //     if (err) {
    //         return res.status(400).json({ err });
    //     }
    //     res.json({ categories });
    //  })
    const categories = await Category.find({});
    if (!categories) {
        res.status(400).json({ err });
    }
    res.status(200).json({ categories });
}

/**
 * @desc   Update category --> [PUT] /api/category/:id
 * @access  Private , admin
 */
exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { nameCategory } = req.body;

    const category = await Category.findById(id);
    if (category) {
        category.nameCategory = nameCategory;

        const updateCategory = await category.save();
        res.status(200).json({ message: 'Cập nhật danh mục thành công ', updateCategory })
    } else {
        res.status(404).json({message: 'Không tìm thấy dang mục'})
    }
}

/**
 * @desc   Delete category --> [Delete] /api/category/:id
 * @access  Private , admin
 */
exports.deleteCategory = async (req, res) => {
    const { id } = req.params;

    await Category.findByIdAndRemove(id);
    res.status(200).json({ message: 'Xoa danh muc thanh cong' })
}
