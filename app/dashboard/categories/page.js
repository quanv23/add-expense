'use client';

import { useState } from 'react';
import ExpenseIncomeHeader from '@/app/components/ExpenseIncomeHeader';

export default function Categories() {
	// State that manages information to narrow query
	const [queryInfo, setQueryInfo] = useState({
		isExpense: true, // switches between either expenses or income
		startDate: new Intl.DateTimeFormat('en-US', {
			month: 'short',
			day: '2-digit',
			year: 'numeric',
		}).format(new Date()), // date in which the range checks around, first formats date to match the date input format
		range: 4, // 1 = day, 2 = week, 3 = month, 4 = year
	});

	// Callback function to toggle view between expense and income
	function toggleIsExpense() {
		setQueryInfo({ ...queryInfo, isExpense: !queryInfo.isExpense });
	}

	// Callback function to update the new selected startDate
	function toggleDate(newDate) {
		setQueryInfo({ ...queryInfo, startDate: newDate });
	}

	return (
		<div>
			<header>
				<ExpenseIncomeHeader
					isExpense={queryInfo.isExpense}
					toggleIsExpense={toggleIsExpense}
					date={queryInfo.startDate}
					toggleDate={toggleDate}
				/>
			</header>
			<div>{queryInfo.isExpense ? 'true' : 'false'}</div>
		</div>
	);
}
