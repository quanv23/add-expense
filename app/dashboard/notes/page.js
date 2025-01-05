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
		return (
			<NoteDisplay
				key={note._id}
				id={note._id}
				title={note.title}
				body={note.body}
				onEdit={handleEditNote}
			/>
		);
	});

	// Function to pass to addNoteForm to update notes state when a new note is created
	function handleAddNote(newNote) {
		setNotes((prev) => [...prev, newNote]);
	}

	// Function to pass to NoteDisplay to update note states when one of them is edited and updates the note with the corresponding id
	function handleEditNote(id, updatedNote) {
		setNotes((prev) =>
			prev.map((note) => {
				return note._id === id ? { ...note, ...updatedNote } : note;
			})
		);
	}

	return (
		<div>
			<header>Notes</header>
			<button onClick={handleOpen}>Add Note</button>
			<main>
				<Modal isOpen={isModalOpen} onClose={handleOpen}>
					<AddNoteForm onAdd={handleAddNote} />
				</Modal>
				{noteElements}
			</main>
		</div>
	);
}
