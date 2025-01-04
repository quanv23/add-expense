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

// Creates a singular new post
export async function POST(req) {
	try {
		await connectDB();
		const body = await req.json(); // parses request from JSON to js object
		const newNote = await Note.create(body);
		return new Response(JSON.stringify(newNote), { status: '201' });
	} catch (e) {
		console.error('Error creating note', e);
		return new Response('Error creating note', { status: '500' });
	}
}
