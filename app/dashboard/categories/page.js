'use client';

import { useState, useEffect } from 'react';
import ExpenseIncomeHeader from '@/app/components/ExpenseIncomeHeader';
import CategoryCard from '@/app/components/categoryPage/CategoryCard';
import RangeSelector from '@/app/components/categoryPage/RangeSelector';
import Modal from '@/app/components/Modal';
import EditCategoryCard from '@/app/components/categoryPage/EditCategoryCard';
import AddCategoryForm from '@/app/components/categoryPage/AddCategoryForm';

const options = {
	month: 'short',
	day: 'numeric',
	year: 'numeric',
};

const today = new Date();

export default function Categories() {
	const [filteredCategories, setFilteredCategories] = useState([]);
	const [isOpen, setIsOpen] = useState(false); // state to manage 'add category' modal

	// State that manages information to narrow query
	const [queryParameters, setQueryParameters] = useState({
		isExpense: true, // switches between either expenses or income
		startDate: today.toLocaleString('en-US', options),
		range: 'year',
	});

	// Function that updates whether the add category modal is showing or not
	function toggleModal() {
		setIsOpen((prev) => !prev);
	}

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

	// Callback function to set the range
	function setRange(newRange) {
		setQueryParameters({
			...queryParameters,
			range: newRange,
		});
	}

	useEffect(() => {
		// Gets the summarized category data based off of the query parameters
		async function fetchSummarizedCategories() {
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

	// Maps the filtered categories onto their own card component
	const categoryCards = filteredCategories.map((obj) => {
		return (
			<CategoryCard
				key={obj._id}
				categoryName={obj._id}
				totalSum={obj.sum}
				percent={obj.percent}
				expenses={obj.expenses}
			/>
		);
	});

	const editCategoryCards = filteredCategories.map((obj) => {
		return (
			<EditCategoryCard
				key={obj._id}
				categoryName={obj._id}
				categoryColour='#ffffff'
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
				<RangeSelector setRange={setRange} range={queryParameters.range} />
				{categoryCards}
				<button onClick={toggleModal}>Add</button>
				<Modal isOpen={isOpen} onClose={toggleModal}>
					<AddCategoryForm />
					{editCategoryCards}
				</Modal>
			</main>
		</div>
	);
}
