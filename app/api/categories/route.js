import connectDB from '@/lib/mongodb';
import { Category } from '@/lib/models/Category';

// Creates route to handle GET request from /categories/
export async function GET() {
	try {
		// connects to db and gets all categories and returns response with status 200 if successful and 500 if unsuccessful
		await connectDB();
		const categories = await Category.find({});
		return new Response(JSON.stringify(categories), { status: 200 }); // must stringify json since HTTP responses must be a string
	} catch (e) {
		console.error('Error getting categories', e);
		return new Response('Error getting categories', { status: 500 });
	}
}

// Creates route to handle POST request for one instance
export async function POST(req) {
	try {
		await connectDB();
		const body = await req.json();
		const newCategory = await Category.create(body); // creates category with the new body
		return new Response(JSON.stringify(newCategory), { status: '201' });
	} catch (e) {
		console.error('Error creating category', e);
		return new Response(JSON.stringify({ error: 'Error creating category' }), {
			status: '500',
		});
	}
}
