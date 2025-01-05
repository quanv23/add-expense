import connectDB from '@/lib/mongodb';
import Note from '@/lib/models/Note';

// PUT reqeust that edits a note
export async function PUT(req, { params }) {
	const { id } = await params;

	try {
		await connectDB();
		const data = await req.json(); // parse to js object

		// Finds the matching document first since save() needs a document
		const doc = await Note.findOne({ _id: id });
		doc.title = data.title; // updates the documents fields
		doc.body = data.body;
		await doc.save(); // saves the changes

		return new Response(JSON.stringify(data), { status: '200' });
	} catch (e) {
		console.error('Error updating note', e);
		return new Response(JSON.stringify({ error: 'Error updating note' }), {
			status: '500',
		});
	}
}

export async function DELETE(req, { params }) {
	const { id } = await params;

	try {
		await connectDB();
		const note = await Note.findByIdAndDelete(id);
		console.log(note);
		return new Response(JSON.stringify(note), { status: '201' });
	} catch (e) {
		console.error('Error deleting note', e);
		return new Response(JSON.stringify({ error: 'Error deleting note' }), {
			status: '500',
		});
	}
}
