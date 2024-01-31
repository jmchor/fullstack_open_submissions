import { ALL_BOOKS } from '../queries';
import { useQuery } from '@apollo/client';
import { useState } from 'react';

const Books = (props) => {
	const [genreToSearch, setGenreToSearch] = useState({});

	const result = useQuery(ALL_BOOKS, {
		variables: { genreToSearch },
	});

	const { loading, data } = useQuery(ALL_BOOKS);

	if (loading) {
		return <div>loading ...</div>;
	}

	const books = data?.allBooks;
	const genresArray = books.reduce((acc, book) => {
		return acc.concat(book.genres);
	}, []);
	const uniqueGenresArray = [...new Set(genresArray)];

	const filteredBooks = result?.data?.allBooks;

	if (!props.show) {
		return null;
	}

	return (
		<div>
			<h2>books</h2>

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{filteredBooks?.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>

			{uniqueGenresArray.map((genre) => (
				<button key={genre} value={genre} onClick={(e) => setGenreToSearch(e.target.value)}>
					{genre}
				</button>
			))}
		</div>
	);
};

export default Books;
