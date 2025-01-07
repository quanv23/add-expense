import connectDB from '@/lib/mongodb';
import Expense from '@/lib/models/Expense';

export async function PUT(req, { params }) {
	const { id } = await params;

	try {
		await connectDB();
		const data = await req.json();
		const date = new Date(data.date); // creates date object from YYYY-MM-DD for storage in db

		const doc = await Expense.findOne({ _id: id });
		doc.title = data.title;
		doc.amount = data.amount;
		doc.category = data.category;
		doc.date = date;
		await doc.save();

		return new Response(JSON.stringify(data), { status: '200' });
	} catch (e) {
		console.error('Error updating expense', e);
		return new Response(JSON.stringify({ error: 'Error updating expense' }), {
			status: '500',
		});
	}
}
