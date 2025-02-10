export default function RangeSelector(props) {
	const { setRange } = props;

	return (
		<div>
			<button onClick={setRange}>Day</button>
			<button onClick={setRange}>Week</button>
			<button onClick={setRange}>Month</button>
			<button onClick={setRange}>Year</button>
		</div>
	);
}
