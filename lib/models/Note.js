import mongoose from 'mongoose';

// Create and export note schema and model
const noteSchema = mongoose.Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
});

const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
export default Note;
