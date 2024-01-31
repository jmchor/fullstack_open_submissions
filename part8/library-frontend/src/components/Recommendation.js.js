import { ALL_BOOKS, CURRENT_USER } from '../queries';
import { useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

const Recommendation = ({ show, user }) => {
	const books = [];

	if (!show) {
		return null;
	}
	// if (loading) {
	// 	return <div>loading ...</div>;
	// }

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
					{books?.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Recommendation;
