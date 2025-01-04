'use client';

import NoteDisplay from '@/app/components/notesPage/NoteDisplay';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Notes() {
	// State for managing all notes initalize as empty list
	const [notes, setNotes] = useState([]);

	// Fetches notes from database on initial render
	useEffect(() => {
		async function getNotes() {
			const response = await fetch('/api/notes');
			const data = await response.json();
			console.log(data);
			setNotes(data);
		}
		getNotes();
	}, []);

	const noteElements = notes.map((note) => {
		return <NoteDisplay key={note._id} title={note.title} body={note.body} />;
	});

	return (
		<div>
			<header>Notes</header>
			<Link href='/'>Add</Link>
			<main>{noteElements}</main>
		</div>
	);
}
