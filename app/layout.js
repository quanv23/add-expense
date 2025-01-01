import './globals.css';

export const metadata = {
	title: 'Add Expense',
	description: 'A Next.js App',
};

export default function RootLayout({ children }) {
	return (
		<html>
			<body>
				<>{children}</>
			</body>
		</html>
	);
}
