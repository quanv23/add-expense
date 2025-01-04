export default function Modal(props) {
	const { isOpen, onClose, children } = props;

	// If modal isn't open it displays nothing, not even the it's children elements
	if (!isOpen) return null;

	// onClose is defined in it's parent component to determine what the button should do
	return (
		<div>
			<button onClick={onClose}>&times;</button>
			{children}
		</div>
	);
}
