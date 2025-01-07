import mongoose from 'mongoose';

// Create cateogry schema to organize expenses by categories
const categorySchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		colour: { type: String, required: true },
	},
	{ _id: false }
);

const Category =
	mongoose.models.Category || mongoose.model('Category', categorySchema);

export { Category, categorySchema };
