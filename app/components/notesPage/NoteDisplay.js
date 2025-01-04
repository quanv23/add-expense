import { useState } from 'react';
import YesNoButton from './YesNoButton';

export default function NoteDisplay(props) {
	const { id, title, body } = props;

	const [isEdit, setIsEdit] = useState(false); // State to manage whether the note is being editted or not
	const [isDelete, setIsDelete] = useState(false); // State to manage whether the note is being deleted or not
	const [editFormData, setEditFormData] = useState({
		// State to manage form data used for editting
		title: title,
		body: body,
	});

	// Function to toggles isEdit when an event occurs
	function handleEditChange() {
		setIsEdit((prev) => !prev);
	}

	// Fucntion to toggles isDelete when an event occurs
	function handleDeleteChange() {
		setIsDelete((prev) => !prev);
	}

	// Handles changes to input fields and updates state accordingly
	function onChange(e) {
		const { name, value } = e.target;
		setEditFormData({ ...editFormData, [name]: value });
	}

	async function handleEdit() {
		try {
			const response = await fetch(`/api/notes/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(editFormData),
			});
		} catch (e) {
			console.error('Error: ', e);
		}
		handleEditChange();
	}

	// Determines what buttons to show depending on the statem whether its edit/delete or confirm/cancel
	function determineButtons() {
		if (isEdit) {
			// confirmation buttons for editing a note
			return <YesNoButton onCancel={handleEditChange} onConfirm={handleEdit} />;
		} else if (isDelete) {
			// confirmation buttons for deleting a note
			return (
				<YesNoButton
					onCancel={handleDeleteChange}
					onConfirm={handleDeleteChange}
				/>
			);
		} else {
			// Buttons to decide if they want to edit or delete
			return (
				<div>
					<button onClick={handleEditChange}>Edit</button>
					<button onClick={handleDeleteChange}>Delete</button>
				</div>
			);
		}
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
			{determineButtons()}
			<br />
		</div>
	);
}
