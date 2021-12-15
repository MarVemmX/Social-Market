import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
        },
        price: {
            type: Number,
        },
        images: {
            type: Array,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);


const Post = mongoose.model('Post', postSchema);

module.exports = Post;
