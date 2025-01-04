export default function YesNoButton(props) {
	const { onCancel, onConfirm } = props;

	return (
		<div>
			<button onClick={onConfirm}>Confirm</button>
			<button onClick={onCancel}>Cancel</button>
		</div>
	);
}
