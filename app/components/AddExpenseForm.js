'use client';

import { useEffect, useState } from 'react';

export default function AddExpenseForm() {
	const [expenseData, setExpenseData] = useState({
		// State for the input values of expenses
		title: '',
		amount: '',
		category: {},
	});
	const [category, setCategory] = useState(''); // state for displaying categories in select since category is an object in expenseData
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

	// Maps the categories on drop down options for selection assigning the value to the category id
	const categoryElements = categories.map((category) => {
		return (
			<option key={category._id} value={category._id}>
				{category.name}
			</option>
		);
	});

	// Whenver an input value is changes it adjusts it corresponding field in expenseData state
	// Relies on fact that input name = field name, Ex. input name = title === expenseData field name = title
	function handleChange(e) {
		const { name, value } = e.target;
		setExpenseData({ ...expenseData, [name]: value });
	}

	// Handles whenever category changes and updates category and expenseData state
	function handleCategoryChange(e) {
		const { value } = e.target;
		setCategory(value);

		// Converts the objectID to the actual category object and updates expenseData with correct object
		const categoryObject = categories.find((object) => object._id === value);
		setExpenseData({
			...expenseData,
			category: { name: categoryObject.name, colour: categoryObject.colour },
		});
	}

	// Submits expenseData once the form is submitted
	async function handleSubmit(e) {
		e.preventDefault();

		try {
			// Attempts to make POST request to api/expenses
			const response = await fetch('/api/expenses', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(expenseData), // must parse expenseData from javascript object to JSON
			});

			// Resets input fields only if response is ok
			if (response.ok) {
				setExpenseData({ title: '', amount: '', category: '' });
				setCategory('');
			}
		} catch (e) {
			console.error('Error: ', e);
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='title'>
				Title:
				<input
					type='text'
					name='title'
					id='title'
					value={expenseData.title}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor='amount'>
				Amount:
				<input
					type='number'
					name='amount'
					id='amount'
					value={expenseData.amount}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor='category'>
				Category:
				<select
					name='category'
					id='category'
					value={category}
					onChange={handleCategoryChange}
				>
					<option>Select a Category</option>
					{categoryElements}
				</select>
			</label>
			<button type='submit'>Add +</button>
		</form>
	);
}
