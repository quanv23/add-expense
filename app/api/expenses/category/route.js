import connectDB from '@/lib/mongodb';
import Expense from '@/lib/models/Expense';

// Route for getting total spent per category grouped by type, and filtered by date and range
export async function GET(req) {
	try {
		// Get search parameters from URL in fetch
		const url = new URL(req.url);
		const type =
			url.searchParams.get('isExpense') === 'true' ? 'expense' : 'income';
		const sortOrder = url.searchParams.get('isExpense') === 'true' ? 1 : -1;
		const startDate = url.searchParams.get('startDate');
		const range = url.searchParams.get('range');

		// Finds the first and last day filter depending on the range
		const date = new Date(startDate);
		let firstDay;
		let lastDay;
		if (range === 'day') {
			// First is the just the current date
			firstDay = date;

			// Last day is set to the next day becuase of EST to UTC conversions
			lastDay = new Date(date);
			lastDay.setDate(lastDay.getDate() + 1);
		} else if (range === 'week') {
			const dayOfWeek = date.getDay();

			// Calculate the first day (Sunday)
			firstDay = new Date(date);
			firstDay.setDate(date.getDate() - dayOfWeek);

			// Sets last day to be the sunday again because of EST to UTC conversion
			lastDay = new Date(date);
			lastDay.setDate(date.getDate() + (7 - dayOfWeek));
		} else if (range === 'month') {
			// Gets first day of the month
			firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

			// Sets last day of month to be first day of the next month because of the EST to UTC conversion
			lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
		} else if (range === 'year') {
			const currentYear = date.getFullYear();

			// First day of the year (January 1st)
			firstDay = new Date(currentYear, 0, 1);

			// Last day is January 1st, 5:00AM because of EST to UTC conversion
			lastDay = new Date(currentYear + 1, 0, 1);
		}

		await connectDB();
		console.log(type);
		const expenses = await Expense.aggregate([
			// Gets all expenses of either type expense or income
			{ $match: { type: type } },
			{ $match: { date: { $gte: firstDay, $lte: lastDay } } },
			// Groups them by category name, and sums the total amount of each category
			{
				$group: {
					_id: '$category.name',
					expenses: {
						$push: {
							title: '$title',
							amount: '$amount',
							date: '$date',
						},
					},
					sum: { $sum: '$amount' },
				},
			},

			// Sorts in either descending or ascending order depending on whether they're expenses or income
			{ $sort: { sum: sortOrder } },
		]);
		return new Response(JSON.stringify(expenses), { status: '200' });
	} catch (e) {
		console.error('Error getting category expenses', e);
		return new Response(
			JSON.stringify({ error: 'Error getting category expenses' }),
			{ status: '500' }
		);
	}
}
