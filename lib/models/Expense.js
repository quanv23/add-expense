import mongoose from 'mongoose';
import { categorySchema } from './Category.js'; // imports category schema to nest in expense

// Creates schema for expenses and exports it's corresponding model
const expenseSchema = new mongoose.Schema({
	title: { type: String, required: true },
	amount: { type: String, required: true },
	category: categorySchema, // embedding the category schema
	date: { type: Date, default: Date.now },
});

const Expense =
	mongoose.models.Expense || mongoose.model('Expense', expenseSchema);

export default Expense;
