'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MonthlyExpenses from '@/app/components/expensesPage/MonthlyExpenses';

function dateFormatConverter(dateString) {
	const [year, month] = dateString.split('-');
	const date = new Date(year, month - 1);
	const formmattedDate = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
	}).format(date);

	return { dateString: dateString, longDate: formmattedDate };
}

export default function Expenses() {
	const [groupedExpenses, setGroupedExpenses] = useState([]);

	/**
	 * groupedExpenses are all expenses grouped by the month with the type:
	 * [
	 *   {
	 *     _id: String,
	 *     expenses: [ { expenses (refer to Expense Model for individual expense type) } ]
	 *   }
	 * ]
	 */

	// Fetches the grouped expenses from the api endpoint
	useEffect(() => {
		async function getExpenses() {
			const response = await fetch('/api/expenses');
			const data = await response.json();
			setGroupedExpenses(data);
		}
		getExpenses();
	}, []);

	// Maps grouped expenses to monthlyExpenses to display them
	const groupedExpensesElements = groupedExpenses.map((expensesPerMonth) => {
		return (
			<MonthlyExpenses
				key={expensesPerMonth._id}
				date={expensesPerMonth._id}
				expenses={expensesPerMonth.expenses}
				onDelete={onDelete}
				onEdit={onEdit}
			/>
		);
	});

	// Callback function for when a expense is edited it updates the state
	function onEdit(monthKey, expenseId, updatedExpense) {
		setGroupedExpenses((prev) =>
			// First finds the object with the matching month of the deleted expense (refer to type of groupedExpenses above)
			prev.map((expensesObject) => {
				if (expensesObject._id === monthKey) {
					// For the expense with the matching id, it overwrites it's data with the updatedExpense
					expensesObject.expenses = expensesObject.expenses.map((expense) =>
						expense._id === expenseId
							? { ...expense, ...updatedExpense }
							: expense
					);
				}
				return expensesObject;
			})
		);
	}

	// Callback function for when a expense is deleted it updates the state
	function onDelete(monthKey, expenseId) {
		setGroupedExpenses((prev) =>
			prev.map((expensesObject) => {
				// First finds the object matching the month of the deleted expense
				if (expensesObject._id === monthKey) {
					// Filters the grouped expenses within the month of any expenses with the matching deleted expense id
					expensesObject.expenses = expensesObject.expenses.filter(
						(expense) => expense._id != expenseId
					);
				}
				return expensesObject;
			})
		);
	}

	return (
		<div>
			<header>
				<h1>Expenses</h1>
				<Link href='/'>Add</Link>
			</header>
			<main>{groupedExpensesElements}</main>
		</div>
	);
}
