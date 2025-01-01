import mongoose from 'mongoose';

// Creates schema for expenses and exports it's corresponding model
const expenseSchema = new mongoose.Schema({
	title: { type: String, required: true },
	amount: { type: String, required: true },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Category',
		required: true,
	},
	date: { type: Date, default: Date.now },
});

const Expense =
	mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default Expense;
