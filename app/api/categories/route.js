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
