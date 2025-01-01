'use client';

import { useState } from 'react';

export default function AddExpenseForm() {
	// Creates state to assign to each input value
	const [expenseData, setExpenseData] = useState({
		title: '',
		amount: '',
		category: '',
	});

	// Whenver an input value is changes it adjusts it corresponding field in expenseData state
	// Relies on fact that input name = field name, Ex. input name = title === expenseData field name = title
	function handleChange(e) {
		const { name, value } = e.target;
		setExpenseData({ ...expenseData, [name]: value });
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

			// Checks if the response return status between 200-299
			if (response.ok) {
				const data = await response.json();
			} else {
				console.error('Failed to add expense');
			}
		} catch (e) {
			console.error('Error: ', e);
		}
		setExpenseData({ title: '', amount: '', category: '' });
	}

	return (
		<form onSubmit={handleSubmit}>
			<label htmlFor='title'>
				Title:
				<input
					type='text'
					name='title'
					value={expenseData.title}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor='amount'>
				Amount:
				<input
					type='number'
					name='amount'
					value={expenseData.amount}
					onChange={handleChange}
				/>
			</label>
			<label htmlFor='category'>
				Category:
				<select
					name='category'
					value={expenseData.category}
					onChange={handleChange}
				>
					<option>Select a Category</option>
					<option value='fun'>Fun</option>
					<option value='not-fun'>Not Fun</option>
				</select>
			</label>
			<button type='submit'>Add +</button>
		</form>
	);
}
