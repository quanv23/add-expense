import connectDB from '@/lib/mongodb.js';
import Expense from '@/lib/models/Expense'; // imports Expense model
import moment from 'moment-timezone'; // import moment to dynamically determine timezone

// Creates route to handle GET request from /expenses/
export async function GET() {
	const localTimeZone = moment.tz.guess(); // dynamically gets timezone

	try {
		// Connects to db and gets all expenses grouped by month using aggregate pipeline
		await connectDB();
		const expenses = await Expense.aggregate([
			{
				$addFields: {
					// adds new field in 2024-01 format to all expenses to act as unique key to group expenses
					yearMonth: {
						$dateToString: {
							format: '%Y-%m',
							date: '$date',
							timezone: localTimeZone, // ensures the UTC date stored in db is properly converted to local time zone
						},
					},
				},
			},
			{
				$sort: { date: -1 }, // Sort expenses by recency so most recent expenses are at the top of their group
			},
			{
				$group: {
					_id: '$yearMonth', // Group by newly created yearMonth field
					expenses: { $push: '$$ROOT' }, // Collect all grouped expenses into their own arrays
				},
			},
			{
				$sort: { _id: -1 }, // Sort groups by yearMonth descending
			},
		]);
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

		// Sets the type of the expense as either 'income' or 'expense' depending on if its negative or not
		if (body.amount >= 0) {
			body.type = 'income';
		} else {
			body.type = 'expense';
		}

		console.log(body);
		const newExpense = await Expense.create(body); // using the expense model creates an instance in the db with the body object
		return new Response(JSON.stringify(newExpense), { status: '201' });
	} catch (e) {
		console.error('Error creating expense', e);
		return new Response('Error creating expense', { status: '500' });
	}
}
