import AddExpenseForm from './components/page/AddExpenseForm';
import Link from 'next/link';

export default function Home() {
	return (
		<div>
			<header>
				<p>Add</p>
				<h1>Expense</h1>
			</header>
			<main>
				<AddExpenseForm />
				<Link href='/dashboard/expenses'>Expenses</Link>
				<br />
				<Link href='/dashboard'>Dashboard</Link>
			</main>
		</div>
	);
}
