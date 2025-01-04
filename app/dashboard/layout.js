import Link from 'next/link';

export default function DashboardLayout({ children }) {
	return (
		<div>
			<section>{children}</section>
			<footer>
				<Link href='/dashboard'>Home </Link>
				<Link href='/dashboard/categories'>Categories </Link>
				<Link href='/dashboard/expenses'>Expenses </Link>
				<Link href='/dashboard/notes'>Notes </Link>
				<Link href='/'>Add</Link>
			</footer>
		</div>
	);
}
