'use client';

import { useState } from 'react';
import SelectCategory from './SelectCategory';

export default function AddExpenseForm() {
	const [expenseData, setExpenseData] = useState({
		// State for the input values of expenses
		title: '',
		amount: '',
		category: { name: '', colour: '' },
		type: '', // left blank and is set server side
	});

	// Whenver an input value is changes it adjusts it corresponding field in expenseData state
	// Relies on fact that <input name = field-name>, Ex. <input name = title> === expenseData field name = title
	function handleChange(e) {
		const { name, value } = e.target;
		setExpenseData({ ...expenseData, [name]: value });
	}

	// Callback function for SelectCategory that updates 'expenseData' with the new category selection
	function handleCategoryChange(categoryObject) {
		setExpenseData({
			...expenseData,
			category: { name: categoryObject.name, colour: categoryObject.colour },
		});
	}

	// Submits expenseData and POST it to the db
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
				setExpenseData({
					title: '',
					amount: '',
					category: { name: '', colour: '' },
				});
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
				<SelectCategory
					updateFormData={handleCategoryChange}
					category={expenseData.category}
				/>
			</label>
			<button type='submit'>Add +</button>
		</form>
	);
}
