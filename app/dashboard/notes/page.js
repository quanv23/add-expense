'use client';

import NoteDisplay from '@/app/components/notesPage/NoteDisplay';
import AddNoteForm from '@/app/components/notesPage/AddNoteForm';
import Modal from '@/app/components/Modal';
import { useState, useEffect } from 'react';

export default function Notes() {
	const [notes, setNotes] = useState([]); // State for managing all notes
	const [isModalOpen, setIsModalOpen] = useState(false); // State for managing whether modal is open or not
	function toggleModal() {
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
				onDelete={handleDeleteNote}
			/>
		);
	});

	// Function to pass to addNoteForm to update 'notes' state when a new note is created
	function handleAddNote(newNote) {
		setNotes((prev) => [...prev, newNote]);
		toggleModal();
	}

	// Function to pass to NoteDisplay to update 'notes' state when a note is editted
	function handleEditNote(id, updatedNote) {
		// Maps onto 'notes' and only updates the note with the matching id
		setNotes((prev) =>
			prev.map((note) => {
				return note._id === id ? { ...note, ...updatedNote } : note;
			})
		);
	}

	// Function to pass to NoteDisplay to update 'notes' state when a note is deleted
	function handleDeleteNote(id) {
		// Filters previous 'notes' by removing any note matching the removed id
		setNotes((prev) => prev.filter((note) => note._id != id));
	}

	return (
		<div>
			<header>Notes</header>
			<button onClick={toggleModal}>Add Note</button>
			<main>
				<Modal isOpen={isModalOpen} onClose={toggleModal}>
					<AddNoteForm onAdd={handleAddNote} />
				</Modal>
				{noteElements}
			</main>
		</div>
	);
}
