'use client';

import { useState, useEffect } from 'react';
import ExpenseIncomeHeader from '@/app/components/ExpenseIncomeHeader';
import CategoryCard from '@/app/components/CategoryCard';

const options = {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
};

export default function Categories() {
	const [filteredCategories, setFilteredCategories] = useState([]);

	// State that manages information to narrow query
	const [queryParameters, setQueryParameters] = useState({
		isExpense: true, // switches between either expenses or income
		endDate: new Date(),
		startDate: new Date(),
		range: 4, // 1 = day, 2 = week, 3 = month, 4 = year
	});

	// Callback function to toggle view between expense and income
	function toggleIsExpense() {
		setQueryParameters({
			...queryParameters,
			isExpense: !queryParameters.isExpense,
		});
	}

	// Callback function to update the new selected startDate
	function setDateRange(newStartDate, newEndDate) {
		setQueryParameters({
			...queryParameters,
			startDate: newStartDate,
			endDate: newEndDate,
		});
	}

	useEffect(() => {
		// Gets the summarized category data based off of the query parameters
		async function fetchSummarizedCategories() {
			try {
				const res = await fetch('/api/expenses/category');
				const data = await res.json();

				// Adds additionally informtation to the data
				data.forEach((obj) => {
					// Calculates the total sum of the entire type (income/expense)
					const categories = obj.categories;
					const sum = categories.reduce((acc, cur) => acc + cur.totalSum, 0);

					// For each category calculates their percent relative to their type's sum
					categories.forEach((obj) => {
						obj.percent = Math.round((obj.totalSum / sum) * 100);
					});
				});
				setFilteredCategories(data);
			} catch (e) {
				console.error('Error: ', e);
			}
		}
		fetchSummarizedCategories();
	}, []);

	return (
		<div>
			<header>
				<ExpenseIncomeHeader
					isExpense={queryParameters.isExpense}
					toggleIsExpense={toggleIsExpense}
					setDateRange={setDateRange}
				/>
			</header>
			<div>{queryParameters.startDate.toLocaleString('en-US', options)}</div>
			<div>{queryParameters.endDate.toLocaleString('en-US', options)}</div>
		</div>
	);
}
