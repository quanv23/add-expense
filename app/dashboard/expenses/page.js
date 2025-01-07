'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import MonthlyExpenses from '@/app/components/expensesPage/MonthlyExpenses';

export default function Expenses() {
	const [groupedExpenses, setGroupedExpenses] = useState([]);

	/**
	 * groupedExpenses are all expenses grouped by the month they're in with the type:
	 * [
	 *   {
	 *     _id: String,
	 *     expenses: [ { expenses (refer to Expense Model) } ]
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
			/>
		);
	});

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
