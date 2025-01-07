export default function Modal(props) {
	const { isOpen, onClose, children } = props;

	/**
	 * isOpen: Bool value that determines whether the modal is visible or not (must be a state)
	 * onClose: callback function that updates the isOpen state in order to close modal
	 * children: The children elements contained within this modal
	 */

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
