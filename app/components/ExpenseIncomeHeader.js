import { useRef, useEffect } from 'react';
import AirDatepicker from 'air-datepicker';
import 'air-datepicker/air-datepicker.css';

import localeEn from 'air-datepicker/locale/en';

export default function ExpenseIncomeButton(props) {
	const { isExpense, toggleIsExpense, setStartDate } = props;

	/**
	 * isExpense: Boolean that indicates whether the type is current expense (true) or income (true)
	 * toggleIsExpense: Function that toggles isExpense
	 * setStartDate: Function that takes one arguement which is the new start date
	 */

	const datepickerRef = useRef(); // creates reference to datepicker

	useEffect(() => {
		// Creates new datepicker that references an <input> in JSX
		const datepicker = new AirDatepicker(
			datepickerRef.current,
			{
				locale: localeEn.default,
				dateFormat: 'MMM. dd',
				isMobile: true, // Makes the calendar open as a modal
				autoClose: true,
				onSelect({ date }) {
					// updates date when a new date is selected
					setStartDate(date);
				},

				/**
				 * Must use 'default' field for localeEn since source code exports the locales in this format
				 * export default { key : value }
				 * Without the const or variable name which means when it is imported it comes in as { default, _esModule } where default is the actual info
				 */
			},
			[]
		);

		// Cleanup function that occurs when the component is unmounted
		return () => {
			datepicker.destroy();
		};
	});

	// Changes colour to green for whichever state is currently active
	const expenseStyle = { backgroundColor: isExpense ? '#33ba77' : 'white' };
	const incomeStyle = { backgroundColor: !isExpense ? '#33ba77' : 'white' };

	return (
		<div>
			<button
				onClick={!isExpense ? toggleIsExpense : null} // Only changes state if the current state isn't expenses
				style={expenseStyle}
			>
				Expenses
			</button>
			<button
				onClick={isExpense ? toggleIsExpense : null} // Only changes state if the current state isn't income
				style={incomeStyle}
			>
				Incomes
			</button>
			<input type='text' ref={datepickerRef} placeholder='Date' />
		</div>
	);
}
