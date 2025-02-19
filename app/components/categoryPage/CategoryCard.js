import { useState } from 'react';
import Expenses from './Expenses';
import Modal from '../Modal';

export default function CategoryCard(props) {
	const [isOpen, setIsOpen] = useState(false);

	const { categoryName, totalSum, percent, expenses } = props;

	function toggleModal() {
		setIsOpen((prev) => !prev);
	}

	const expenseElements = expenses.map((expense) => {
		return (
			<Expenses
				key={expense.title}
				title={expense.title}
				amount={expense.amount}
				date={expense.date}
			/>
		);
	});

	return (
		<div>
			<button onClick={toggleModal}>{categoryName}</button>
			<p>{totalSum}</p>
			<p>{percent}%</p>
			<Modal isOpen={isOpen} onClose={toggleModal}>
				{expenseElements}
			</Modal>
		</div>
	);
}
