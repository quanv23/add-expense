import { useState } from 'react';
import EditDeleteButton from '../EditDeleteButton';

export default function NoteDisplay(props) {
	const { id, title, body, onEdit, onDelete } = props;

	const [isEdit, setIsEdit] = useState(false); // State to manage whether notes are being edited or not
	const [editFormData, setEditFormData] = useState({
		// State to manage form data used for editting
		title: title,
		body: body,
	});

	// Handles changes to input fields and updates state accordingly
	function onChange(e) {
		const { name, value } = e.target;
		setEditFormData({ ...editFormData, [name]: value });
	}

	// Handles when delete is confirmed and calls api using dynamic route and deletes by id
	async function handleDelete() {
		try {
			const response = await fetch(`/api/notes/${id}`, { method: 'DELETE' });

			// Calls callback function to update state when it's deleted
			if (response.ok) {
				const data = await response.json(); // parse from JSON to js object
				onDelete(data._id);
			}
		} catch (e) {
			console.error('Error: ', e);
		}
	}

	// Handles edits once it's confirmed and fetches from api using dynamic [id] route
	async function handleEdit() {
		try {
			const response = await fetch(`/api/notes/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(editFormData),
			});

			// uses callback function onEdit to update the state of the new changes
			if (response.ok) {
				const data = await response.json();
				onEdit(id, data);
			}
		} catch (e) {
			console.error('Error: ', e);
		}
	}

	// Toggles isEdit when an event occurs and is to be used in EditDeleteButton to properly update state
	function toggleEditFormData() {
		setIsEdit((prev) => !prev);
	}

	// Resets edit form data to be used in EditDeleteButton for correct edit cancellation
	function resetEditFormData() {
		setEditFormData({ title: title, body: body });
	}

	return (
		<div>
			{isEdit ? (
				<section>
					<input
						type='text'
						name='title'
						value={editFormData.title}
						onChange={onChange}
					/>
					<input
						type='text'
						name='body'
						value={editFormData.body}
						onChange={onChange}
					/>
				</section>
			) : (
				<section>
					<h4>{title}</h4>
					<p>{body}</p>
				</section>
			)}
			<EditDeleteButton
				toggleEditFormData={toggleEditFormData}
				resetEditFormData={resetEditFormData}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
			/>
			<br />
		</div>
	);
}
