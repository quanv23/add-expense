import Link from 'next/link';

export default function Expenses() {
	const d = new Date();
	console.log(d.toLocaleString());

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
