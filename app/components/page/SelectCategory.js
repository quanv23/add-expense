import { useState, useEffect } from 'react';

export default function SelectCategory(props) {
	const { updateFormData, category } = props;

	/**
	 * updateFormData: Callback function that updates the 'formData' state with the given categoryObject passed to it when selected category is changed
	 */

	const [categories, setCategories] = useState([]); // default state is [] for map function

	// On intial render fetches categories from database
	useEffect(() => {
		async function getCategories() {
			const response = await fetch('/api/categories');
			const data = await response.json(); // must parse response from JSON to javascipt object to be usuable
			setCategories(data);
		}
		getCategories();
	}, []);

	// Maps categories onto <options> setting value to category._id for callback function to update state
	const categoryElements = categories.map((category) => {
		return (
			<option key={category._id} value={category.name}>
				{category.name}
			</option>
		);
	});

	// Handles when the selected category changes by getting the id, and using a callback function to update state with the new categroy selected
	function handleCategoryChange(e) {
		const { value } = e.target; // value is the id of the category
		const categoryObject = categories.find((object) => object.name === value);
		updateFormData(categoryObject); // callback function that updates expenseForm by passing it the corresponding selected category object
	}

	return (
		<select
			name='category'
			id='category'
			value={category.name}
			onChange={handleCategoryChange}
		>
			<option value=''>Select a Category</option>
			{categoryElements}
		</select>
	);
}
