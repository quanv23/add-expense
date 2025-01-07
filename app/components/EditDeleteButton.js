import { useState } from 'react';

export default function EditDeleteButton(props) {
	const { toggleEditFormData, resetEditFormData, handleDelete, handleEdit } =
		props;

	/**
	 * toggleEditFormData: callback function that updates whether the fields are in edit form or not
	 * resetEditFormData: callback function that resets the 'editForm' state back to their original values when edit is cancelled
	 * handleDelete: function that occurs once the delete is confirmed (usually some fetch DELETE method to api)
	 * handleEdit: function that occurs once the edit is confirmed (usually some fetch PUT method to api)
	 */

	const [isEdit, setIsEdit] = useState(false); // State to manage whether object is being editted or not
	const [isDelete, setIsDelete] = useState(false); // State to manage whether object is being deleted or not

	// Toggles isDelete when an event occurs
	function toggleIsDelete() {
		setIsDelete((prev) => !prev);
	}

	// Handles when delete is confirmed and applies the given delete logic and toggles isDelete
	function handleDeleteConfirm() {
		handleDelete();
		toggleIsDelete();
	}

	// Toggles isEdit when an event occurs
	function toggleIsEdit() {
		setIsEdit((prev) => !prev);
		toggleEditFormData();
	}

	// Handles when an edit is cancelled and resets any unsaved edits and toggles isEdit
	function handleEditCancel() {
		resetEditFormData();
		toggleIsEdit();
	}

	// Handles when an edit is confirmed and applies the given edit logic and toggles isEdit
	function handleEditConfirm() {
		handleEdit();
		toggleIsEdit();
	}

	// Determines what buttons to show depending on the state whether its edit/delete or confirm/cancel
	function determineButtons() {
		if (isEdit) {
			// confirmation buttons for editing
			return (
				<div>
					<button onClick={handleEditConfirm}>Confirm</button>
					<button onClick={handleEditCancel}>Cancel</button>
				</div>
			);
		} else if (isDelete) {
			// confirmation buttons for deleting
			return (
				<div>
					<button onClick={handleDeleteConfirm}>Confirm</button>
					<button onClick={toggleIsDelete}>Cancel</button>
				</div>
			);
		} else {
			// Buttons to decide if they want to edit or delete
			return (
				<div>
					<button onClick={toggleIsEdit}>Edit</button>
					<button onClick={toggleIsDelete}>Delete</button>
				</div>
			);
		}
	}

	return <div>{determineButtons()}</div>;
}
