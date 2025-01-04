export default function NoteDisplay(props) {
	const { title, body } = props;

	return (
		<div>
			<h4>{title}</h4>
			<p>{body}</p>
			<br />
		</div>
	);
}
