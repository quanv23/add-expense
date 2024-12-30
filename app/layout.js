export const metadata = {
	title: 'My App',
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
