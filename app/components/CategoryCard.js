export default function CategoryCard(props) {
	const { categoryName, totalSum, percent } = props;

	return (
		<div>
			<h3>{categoryName}</h3>
			<p>{totalSum}</p>
			<p>{percent}%</p>
		</div>
	);
}
