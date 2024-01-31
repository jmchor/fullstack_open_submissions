import { ALL_AUTHORS } from '../queries';
import { useQuery } from '@apollo/client';
import Birthyear from './Birthyear';
const Authors = (props) => {
	const { loading, error, data } = useQuery(ALL_AUTHORS);

	if (loading) {
		return <div>loading...</div>;
	}
	const authors = data?.allAuthors;

	if (!props.show) {
		return null;
	}
	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>

			<Birthyear authors={authors} />
		</div>
	);
};

export default Authors;
