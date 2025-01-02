import connectDB from '@/lib/mongodb.js';
import Expense from '@/lib/models/Expense'; // imports Expense model

// Creates route to handle GET request from /expenses/
export async function GET() {
	try {
		// connects to db and gets all expenses and returns response with status 200 if successful and 500 if unsuccessful
		await connectDB();
		const expenses = await Expense.find({});
		return new Response(JSON.stringify(expenses), { status: '200' }); // must stringify json since HTTP responses must be a string
	} catch (e) {
		console.error('Error getting expenses', e);
		return new Response('Error getting expenses', { status: 500 });
	}
}

// Creates route for POST requests to create a singular expense
export async function POST(req) {
	try {
		await connectDB();
		const body = await req.json(); // parses the req from JSON to javascript object
		const newExpense = await Expense.create(body); // using the expense model creates an instance in the db with the body object
		return new Response(JSON.stringify(newExpense), { status: '201' });
	} catch (e) {
		console.error('Error creating expense', e);
		return new Response('Error creating expense', { status: '500' });
	}
}
