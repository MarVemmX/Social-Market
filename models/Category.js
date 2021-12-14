import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator';

const categorySchema = new mongoose.Schema(
    {
        nameCategory: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        // slug: {
        //     type: String,
        //     slug: 'nameCategory',
        //     unique: true,
        // },
    },
    {
        timestamps: true,
    },
);

// Add plugins
// mongoose.plugin(slug);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
