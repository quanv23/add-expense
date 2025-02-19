export default function Expenses(props) {
	const { title, amount, date } = props;

	const d = new Date(date);
	const formattedDate = d.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
	});

	return (
		<div>
			<strong>{title}</strong>
			<p>${amount}</p>
			<p>{formattedDate}</p>
		</div>
	);
}
