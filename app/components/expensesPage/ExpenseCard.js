import Modal from '../Modal';
import { useState } from 'react';
import EditDeleteButton from '../EditDeleteButton';
import SelectCategory from '../page/SelectCategory';

// Takes a date string of ISO format "YYYY-MM-DDTHH:mm:ss:sssZ" and converts it to a specific date format
// if isInput is true it returns date in the form YYYY-MM-DD in local time
// else it returns date in short numeric, 2024 in local time
// Ex. 2025-01-01T00:00:00 -> January 1, 2025
function dateFormatConverter(dateString, isInput) {
	const date = new Date(dateString);

	if (isInput) {
		// Converts time to local time in US format with specific options so <input type='date'> can read it
		const formattedDate = new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		}).format(date);
		const [month, day, year] = formattedDate.split('/');
		return `${year}-${month}-${day}`;
	} else {
		// Converts time to local time in US format
		const formmattedDate = new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: 'numeric',
			year: 'numeric',
		}).format(date);
		return formmattedDate;
	}
}

export default function ExpenseCard(props) {
	const { id, month, onDelete, onEdit, title, amount, category, date } = props; // decompose props of an expense
	const formmattedDate = dateFormatConverter(date, false); // formats date to be more readable
	const inputFormattedDate = dateFormatConverter(date, true); // formats date to YYYY-MM-DD so <input type='date'> can read it

	const [isModalOpen, setIsModalOpen] = useState(false); // State to manage whether expense modal is open or not
	const [isEdit, setIsEdit] = useState(false); // State to manage whether modals fields are being editted or not
	const [editFormData, setEditFormData] = useState({
		title: title,
		amount: amount,
		category: { name: category.name, colour: category.colour },
		date: inputFormattedDate,
	});

	// Handles any changes to the edit fields by updating the corresponding state
	function onChange(e) {
		const { name, value } = e.target;
		setEditFormData({ ...editFormData, [name]: value });
	}

	// handles any changes to isModalOpen by switching it's bool value on any event
	function toggleModal() {
		setIsModalOpen((prev) => !prev);
	}

	// Callback function for EditDeleteButton that toggles 'isEdit' state
	function toggleIsEdit() {
		setIsEdit((prev) => !prev);
	}

	// Callback function for EditDelecteButton that resets all the edit form data to original value so if it's cancelled it doesn't save the changes
	function resetEditFormData() {
		setEditFormData({
			title: title,
			amount: amount,
			category: { name: category.name, colour: category.colour },
			date: inputFormattedDate,
		});
	}

	// Handles when edits are confirmed and makes a PUT request to the api endpoint
	async function handleEdit() {
		try {
			const response = await fetch(`/api/expenses/${id}`, {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(editFormData), // takes edit form data as the body
			});

			// Only if the resonse is ok it calls callback function onEdit to update state
			if (response.ok) {
				const data = await response.json(); // must convert data to json object first
				onEdit(month, id, data);
			}
		} catch (e) {
			console.error('Error: ', e);
		}
	}

	// Handles when a delete is confirmed and makes DELETE request to api endpoint
	async function handleDelete() {
		try {
			const response = await fetch(`/api/expenses/${id}`, { method: 'DELETE' });

			// Only if the response is ok it calls callback function onDelete to update state
			if (response.ok) {
				onDelete(month, id);
			}
		} catch (e) {
			console.error('Error: ', e);
		}
	}

	// Callback function for SelectCategory that updates the editFormData with the new selected category
	function handleCategoryChange(categoryObject) {
		setEditFormData({
			...editFormData,
			category: { name: categoryObject.name, colour: categoryObject.colour },
		});
	}

	return (
		<div>
			<p>
				<button onClick={toggleModal}>{title}</button> : ${amount} :{' '}
				{formmattedDate}
			</p>
			<Modal isOpen={isModalOpen} onClose={toggleModal}>
				{isEdit ? (
					<section>
						<input
							type='text'
							name='title'
							value={editFormData.title}
							onChange={onChange}
						/>
						<input
							type='number'
							name='amount'
							value={editFormData.amount}
							onChange={onChange}
						/>
						<SelectCategory
							updateFormData={handleCategoryChange}
							initialCategory={category.name}
						/>
						<input
							type='date'
							name='date'
							value={editFormData.date}
							onChange={onChange}
						/>
					</section>
				) : (
					<>
						<p>{title}</p>
						<p>{amount}</p>
						<p>{category.name}</p>
						<p>{formmattedDate}</p>
						<p>{date}</p>
					</>
				)}
				<EditDeleteButton
					toggleEditFormData={toggleIsEdit}
					resetEditFormData={resetEditFormData}
					handleEdit={handleEdit}
					handleDelete={handleDelete}
				/>
			</Modal>
			<br />
		</div>
	);
}
