import ExpenseCard from './ExpenseCard';

// Takes a date string of format 'YYYY-MM' and converts it to 'long numeric'
// Ex. 2024-01 -> January 2024
function dateFormatConverter(dateString) {
	const [year, month] = dateString.split('-');
	const date = new Date(year, month - 1);
	const formmattedDate = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
	}).format(date);

	return formmattedDate;
}

export default function MonthlyExpenses(props) {
	const { date, expenses, onDelete, onEdit } = props; // decomposes properties of groupedExpense
	const formattedDate = dateFormatConverter(date); // converts date to more readable format

	// maps expenses onto expenseCard component
	const expenseElements = expenses.map((expense) => {
		return (
			<ExpenseCard
				key={expense._id}
				id={expense._id}
				month={date}
				onDelete={onDelete}
				onEdit={onEdit}
				title={expense.title}
				amount={expense.amount}
				category={expense.category}
				date={expense.date}
			/>
		);
	});

	return (
		<div>
			<h2>{formattedDate}</h2>
			<section>{expenseElements}</section>
		</div>
	);
}
