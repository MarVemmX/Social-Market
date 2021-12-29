import Post from '../models/Post';

class APIFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        //  Để filter thì cần phải loại trừ, chuyển req.query thành chuổi để thêm dấu $ rồi chuyển thành object ngược lại
        const queryObj = { ...this.queryString };
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach((element) => delete queryObj[element]);
        let queryStr = JSON.stringify(queryObj); 
        
        // {"gt": "123"} --> {"$gt": "123"}
        // theo chuan mongoose
        queryStr = queryStr.replace(
            /\b(gte|gt|lt|lte|regex)\b/g,
            (match) => "$" + match
        );
        this.query.find(JSON.parse(queryStr)); // find() --> mongodb method, not js
        return this;
    }
    sorting() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy); // this.query.sort(sortStr);
        } else {
            this.query = this.query.sort("-createdAt"); // this.query.sort(sortStr);
        }
        return this;
    }
    pagnigating() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 6;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

class PostControler {
    // [GET] /api/posts
    async getPosts(req, res, next) {
        try {
            const features = new APIFeatures(Post.find({}), req.query)
                .filtering()
                .sorting()
                .pagnigating();
            const posts = await features.query;
            return res.status(200).json({
                message: 'Success',
                results: posts.length,
                posts
            })
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

    // [GET] /api/posts/:id
    async getUserPosts(req, res) {
        try {
            const features = new APIFeatures(Post.find({ seller_id: req.params.id }), req.query)
                .filtering()
                .sorting()
                .pagnigating();
            const posts = await features.query;
            res.status(200).json({
                status: "Success",
                length: posts.length,
                posts,
            });
        } catch (err) {
             return res.status(500).json({ message: err.message });
        }
    }

    // [POST] /api/posts
    async createPost(req, res) {
        try {
            const { title, description, price, images, category } = req.body;
            console.log(req.body);
            if (!images) {
                return res.status(400).json({ message: 'Khong tim thay anh' });
            }
            if (
                !title ||
                !description ||
                !price ||
                !images ||
                !category
            ) {
                return res.status(400).json({message: 'Vui long nhap day du thong tin vao cac truong'})
            }
            const newPost = new Post({
                title,
                description,
                price,
                images,
                category
            });
            newPost.save();
            return res.status(200).json({message: 'Them bai dang thanh cong', newPost})
        } catch (err) {
              return res.status(500).json({ message: 'Them bai dang khong thanh cong' });
        }
    }

    // [PUT] /api/posts/:id
    async updateMyPost(req, res) {
        try {
            const { title, description, price, images, category } = req.body;
            if (!images) {
                return res.status(400).json({message: "Khong co anh nao duoc upload"})
            }
            await Post.findByIdAndUpdate(
                { _id: req.params.id },
                {
                    title,
                    description,
                    price,
                    images,
                    category
                }
            );
            return res.status(201).json({message: "Cap nhat bai dang thanh cong"})
        } catch (err) {
            return res.status(500).json({ message: 'Cap nhat bai dang khong thanh cong' });
        }
    }

    // [DELETE] /api/posts/:id
    async deletePost(req, res) {
        try {
            const { id } = req.params;
            await Post.findByIdAndDelete(id);
            return res.status(200).json({message: "Xoa bai dang thanh cong"})
        } catch (err) {
            res.status(500).json({message: 'Xoa bai dang khong thanh cong'})
        }
    }
}

module.exports = new PostControler();



