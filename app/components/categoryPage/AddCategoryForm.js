import { useState } from 'react';

export default function AddCategoryForm() {
	// State to manage fields for new category
	const [newCategoryForm, setNewCategoryForm] = useState({
		name: '',
		colour: '#ffffff',
	});

	// Handles changes to form input fields by updating their corresponding field in the state
	function onChangeNewCategoryForm(e) {
		const { name, value } = e.target;
		setNewCategoryForm({ ...newCategoryForm, [name]: value });
	}

	// Handles when the form is submitted
	async function handleSubmit(e) {
		e.preventDefault();

		try {
			// Makes post request to categories
			const response = await fetch('/api/categories', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newCategoryForm), // must parse JS object to JSON to send to server
			});

			// If the response is okay resets the input fields
			if (response.ok) {
				setNewCategoryForm({
					name: '',
					colour: '#ffffff',
				});
			}
		} catch (e) {
			console.error('Error: ', e);
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='name'
					placeholder='New Category Name'
					value={newCategoryForm.name}
					onChange={onChangeNewCategoryForm}
				/>
				<input
					type='color'
					name='colour'
					value={newCategoryForm.colour}
					onChange={onChangeNewCategoryForm}
				/>
				<button type='submit'>Add+</button>
			</form>
		</>
	);
}
