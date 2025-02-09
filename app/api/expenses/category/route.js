import connectDB from '@/lib/mongodb';
import Expense from '@/lib/models/Expense';

// Route for getting total spent per category grouped by type, and filtered by date and range
export async function GET() {
	try {
		await connectDB();
		const expenses = await Expense.aggregate([
			/**
			 * First groups expenses by their type (income, expense), and cateory name and sums their total spending returns a list of objects
			 * [
			 *     {
			 *         _id: String
			 *         category: String
			 *         totalSum: Number
			 *     }
			 * ]
			 */
			{
				$group: {
					_id: {
						type: '$type',
						category: '$category.name',
					},
					totalSum: { $sum: '$amount' },
				},
			},
			/**
			 * Then we restructure the query by grouping it again on its type so that the sums are first grouped by id, then within the id they are grouped by their category
			 * So for each type (income/expense) its categories are an array of objects that contain the category name and their respective total sum
			 * [
			 *     {
			 *         _id: String
			 *         categories: [ { category: String, totalSum: Number } ]
			 *     }
			 * ]
			 */
			{
				$group: {
					_id: '$_id.type',
					categories: {
						$push: {
							// push the fields below that have matching _id.type into an array, which creates n arrays for the n different categories
							category: '$_id.category',
							totalSum: '$totalSum',
						},
					},
				},
			},
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
