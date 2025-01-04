import Modal from '../Modal';
import { useState } from 'react';

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

	// State to manage whether expense modal is open or not
	const [isModalOpen, setIsModalOpen] = useState(false);
	function handleOpen() {
		// handles any changes to isModalOpen by switching it's bool value on any event
		setIsModalOpen((prev) => !prev);
	}

	return (
		<div>
			<p>
				<button onClick={handleOpen}>{title}</button> : ${amount} :{' '}
				{formmattedDate}
			</p>
			<Modal isOpen={isModalOpen} onClose={handleOpen}>
				<p>
					{name} : {colour}
				</p>
			</Modal>
			<br />
		</div>
	);
}
