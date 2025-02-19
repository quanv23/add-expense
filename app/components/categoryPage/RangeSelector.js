export default function RangeSelector(props) {
	const { setRange, range } = props;

	// Must use handler function since onClick doesn't work with functions with arguements
	function handleClick(newRange) {
		setRange(newRange);
	}

	// Changes the button background colour depending on the applied range
	const dayStyle =
		range === 'day'
			? { backgroundColor: '#d9d9d9' }
			: { backgroundColor: 'white' };
	const weekStyle =
		range === 'week'
			? { backgroundColor: '#d9d9d9' }
			: { backgroundColor: 'white' };
	const monthStyle =
		range === 'month'
			? { backgroundColor: '#d9d9d9' }
			: { backgroundColor: 'white' };
	const yearStyle =
		range === 'year'
			? { backgroundColor: '#d9d9d9' }
			: { backgroundColor: 'white' };

	return (
		<div>
			<button onClick={() => handleClick('day')} style={dayStyle}>
				Day
			</button>
			<button onClick={() => handleClick('week')} style={weekStyle}>
				Week
			</button>
			<button onClick={() => handleClick('month')} style={monthStyle}>
				Month
			</button>
			<button onClick={() => handleClick('year')} style={yearStyle}>
				Year
			</button>
		</div>
	);
}
