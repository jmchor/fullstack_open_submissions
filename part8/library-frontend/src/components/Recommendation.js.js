import { ALL_BOOKS, CURRENT_USER } from '../queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const Recommendation = ({ show, user }) => {
	const [genreToSearch, setGenreToSearch] = useState({});

	useEffect(() => {
		if (user.data && user.data) {
			setGenreToSearch(user.data.me.favoriteGenre);
			console.log(genreToSearch);
		}
	}, [user, genreToSearch]);

	const result = useQuery(ALL_BOOKS, {
		variables: { genreToSearch },
		skip: !genreToSearch,
	});

	const filteredBooks = result?.data?.allBooks;

	if (!show) {
		return null;
	}

	return (
		<div>
			<h2>recommendations</h2>

			{user?.data?.me?.favoriteGenre && (
				<div>
					<p>
						Books in your favorite genre <b>{user?.data?.me?.favoriteGenre}</b>
					</p>
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
				</div>
			)}
		</div>
	);
};

export default Recommendation;
