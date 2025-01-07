import Modal from '../Modal';
import { useState } from 'react';
import EditDeleteButton from '../EditDeleteButton';
import SelectCategory from '../SelectCategory';

// Takes a date string of ISO format "YYYY-MM-DDTHH:mm:ss:sssZ" and converts it to 'short numeric, numeric'
// Ex. 2025-01-01T00:00:00 -> January 1, 2025
function dateFormatConverter(dateString) {
	const date = new Date(dateString);
	const formmattedDate = new Intl.DateTimeFormat('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	}).format(date);
	return formmattedDate;
}

export default function ExpenseCard(props) {
	const { id, title, amount, category, date } = props; // decompose props of an expense
	const formmattedDate = dateFormatConverter(date); // formats date to be more readable
	const inputFormattedDate = date.split('T')[0]; // formats date to YYYY-MM-DD so <input type='date'> can read it

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
				/>
			</Modal>
			<br />
		</div>
	);
}
