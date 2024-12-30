import mongoose from 'mongoose';

// Creates schema and exports it's corresponding model
const expenseSchema = new mongoose.Schema(
	{
		name: String,
	},
	{ collection: 'expenses' }
);

export default mongoose.models.Expense ||
	mongoose.model('Expense', expenseSchema);
