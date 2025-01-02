import Link from 'next/link';

export default function Expenses() {
	return (
		<div>
			<header>
				<h1>Expenses</h1>
				<Link href='/'>Add</Link>
			</header>
			<main></main>
		</div>
	);
}
