'use client';

import NoteDisplay from '@/app/components/notesPage/NoteDisplay';
import AddNoteForm from '@/app/components/notesPage/AddNoteForm';
import Modal from '@/app/components/Modal';
import { useState, useEffect } from 'react';

export default function Notes() {
	const [notes, setNotes] = useState([]); // State for managing all notes
	const [isModalOpen, setIsModalOpen] = useState(false); // State for managing whether modal is open or not
	function handleOpen() {
		// Switches whether modal is open or not on event
		setIsModalOpen((prev) => !prev);
	}

	// Fetches notes from database on initial render
	useEffect(() => {
		async function getNotes() {
			const response = await fetch('/api/notes');
			const data = await response.json();
			setNotes(data);
		}
		getNotes();
	}, []);

	// Maps notes on NoteDisplay component for jsx
	const noteElements = notes.map((note) => {
		return <NoteDisplay key={note._id} title={note.title} body={note.body} />;
	});

	// Function to pass to addNoteForm to update notes state when a new note is created
	function handleAddItem(newNote) {
		setNotes((prev) => [...prev, newNote]);
	}

	return (
		<div>
			<header>Notes</header>
			<button onClick={handleOpen}>Add Note</button>
			<main>
				<Modal isOpen={isModalOpen} onClose={handleOpen}>
					<AddNoteForm onAdd={handleAddItem} />
				</Modal>
				{noteElements}
			</main>
		</div>
	);
}
