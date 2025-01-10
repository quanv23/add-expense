import { useState } from 'react';

export default function AddNoteForm(props) {
	const { onAdd } = props; // onAdd is callback function to update list of notes when a new note is created

	// State to manage form data
	const [noteData, setNoteData] = useState({
		title: '',
		body: '',
	});

	// Function that updates state on changes in input
	function handleChange(e) {
		const { name, value } = e.target;
		setNoteData({ ...noteData, [name]: value });
	}

	// Function that handles form submission for new notes
	async function handleSubmit(e) {
		e.preventDefault(); // prevents page refresh on submit

		try {
			// Attempts to make POST request with noteData as JSON for body
			const response = await fetch('/api/notes', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(noteData),
			});

			// Reset input fields only is response is ok
			if (response.ok) {
				const data = await response.json();
				onAdd(data); // Callback function that updates notes state
				setNoteData({ title: '', body: '' });
			}
		} catch (e) {
			console.error('Error: ', e);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='title'>
				Title
				<input
					type='text'
					name='title'
					id='title'
					value={noteData.title}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor='body'>
				Body
				<input
					type='text'
					name='body'
					id='body'
					value={noteData.body}
					onChange={handleChange}
				/>
			</label>
			<button type='submit'>Add +</button>
		</form>
	);
}
