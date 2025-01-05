import Modal from '../Modal';
import { useState } from 'react';
import EditDeleteButton from '../EditDeleteButton';

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
	const { title, amount, category, date } = props; // decompose props
	const { name, colour } = category; // decompose category from props
	const formmattedDate = dateFormatConverter(date);

	const [isModalOpen, setIsModalOpen] = useState(false); // State to manage whether expense modal is open or not
	const [isEdit, setIsEdit] = useState(false);

	function toggleModal() {
		// handles any changes to isModalOpen by switching it's bool value on any event
		setIsModalOpen((prev) => !prev);
	}

	return (
		<div>
			<p>
				<button onClick={toggleModal}>{title}</button> : ${amount} :{' '}
				{formmattedDate}
			</p>
			<Modal isOpen={isModalOpen} onClose={toggleModal}>
				<p>
					{name} : {colour}
				</p>
				<EditDeleteButton />
			</Modal>
			<br />
		</div>
	);
}
