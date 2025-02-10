'use client';

import { useState, useEffect } from 'react';
import ExpenseIncomeHeader from '@/app/components/ExpenseIncomeHeader';
import CategoryCard from '@/app/components/CategoryCard';
import RangeSelector from '@/app/components/RangeSelector';

const options = {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
};

const today = new Date();

export default function Categories() {
	const [filteredCategories, setFilteredCategories] = useState([]);

	// State that manages information to narrow query
	const [queryParameters, setQueryParameters] = useState({
		isExpense: true, // switches between either expenses or income
		startDate: today.toLocaleString('en-US', options),
		range: 'year',
	});

	// Callback function to toggle view between expense and income
	function toggleIsExpense() {
		setQueryParameters({
			...queryParameters,
			isExpense: !queryParameters.isExpense,
		});
	}

	// Callback function to update the new selected startDate
	function setStartDate(newStartDate) {
		setQueryParameters({
			...queryParameters,
			startDate: newStartDate.toLocaleString('en-US', options),
		});
	}

	function setRange(newRange) {
		setQueryParameters({
			...queryParameters,
			range: newRange,
		});
	}

	useEffect(() => {
		console.log('useEffect');

		// Gets the summarized category data based off of the query parameters
		async function fetchSummarizedCategories() {
			console.log(queryParameters.isExpense);
			try {
				// Sends query parameters into fetch URL
				const res = await fetch(
					`/api/expenses/category?isExpense=${queryParameters.isExpense}&startDate=${queryParameters.startDate}&range=${queryParameters.range}`
				);
				const data = await res.json();

				// Calulates the total sum of the type (expense/income), as well the sum perentage of each category
				data.totalSum = data.reduce((acc, cur) => acc + cur.sum, 0);
				data.forEach((obj) => {
					obj.percent = Math.round((obj.sum / data.totalSum) * 100);
				});

				setFilteredCategories(data);
			} catch (e) {
				console.error('Error: ', e);
			}
		}
		fetchSummarizedCategories();
	}, [
		// dependencies ensure that the query is only re-run on changes to the parameters
		queryParameters.isExpense,
		queryParameters.startDate,
		queryParameters.range,
	]);

	console.log(filteredCategories);
	const categoryCards = filteredCategories.map((obj) => {
		return (
			<CategoryCard
				key={obj._id}
				categoryName={obj._id}
				totalSum={obj.sum}
				percent={obj.percent}
			/>
		);
	});

	return (
		<div>
			<header>
				<ExpenseIncomeHeader
					isExpense={queryParameters.isExpense}
					toggleIsExpense={toggleIsExpense}
					setStartDate={setStartDate}
				/>
			</header>
			<main>
				<RangeSelector setRange={setRange} />
				{categoryCards}
			</main>
		</div>
	);
}
