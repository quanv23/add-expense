import connectDB from '@/lib/mongodb';
import Note from '@/lib/models/Note';

// Gets all notes and returns notes in JSON format with status 200, or error with status 500
export async function GET() {
	try {
		await connectDB();
		const notes = await Note.find({});
		return new Response(JSON.stringify(notes), { status: '200' });
	} catch (e) {
		console.error('Error getting notes', e);
		return new Response('Error getting notes', { status: '500' });
	}
}
