import connectDB from '@/lib/mongodb';
import Expense from '@/lib/models/Expense';

// Makes a PUT request to edit a expense with the dynamic id
export async function PUT(req, { params }) {
	const { id } = await params;

	try {
		await connectDB();
		const data = await req.json();

		// Converts date to MM/DD/YYYY so when creating a date object js interprets the date as local time, so the db automatically converts it to UTC
		// Since date with YYYY-MM-DD assumes this time is alredy in UTC creating a bug with changing the date
		const [year, month, day] = data.date.split('-');
		const d = new Date(`${month}/${day}/${year}`);

		// Finds the expense with the matching id and updates the respective fields
		const doc = await Expense.findOne({ _id: id });
		doc.title = data.title;
		doc.amount = data.amount;
		doc.category = data.category;
		doc.date = d;
		await doc.save();

		return new Response(JSON.stringify(data), { status: '200' });
	} catch (e) {
		console.error('Error updating expense', e);
		return new Response(JSON.stringify({ error: 'Error updating expense' }), {
			status: '500',
		});
	}
}
