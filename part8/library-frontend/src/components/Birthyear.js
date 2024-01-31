import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { EDIT_BIRTHYEAR } from '../mutations';
import { ALL_AUTHORS } from '../queries';

const Birthyear = ({ authors }) => {
	const [selectedAuthor, setSelectedAuthor] = useState('');
	const [born, setBorn] = useState('');
	const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	});

	const handleSubmit = (e) => {
		e.preventDefault();

		editAuthor({ variables: { name: selectedAuthor, setBornTo: born } });
		setSelectedAuthor('');
		setBorn('');
	};
	return (
		<div>
			<h2>set birthyear</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor='authorSelect'>
					Select Author:
					<select id='authorSelect' value={selectedAuthor} onChange={(e) => setSelectedAuthor(e.target.value)}>
						<option value=''>Select an author</option>
						{authors.map((author) => (
							<option key={author._id} value={author.name}>
								{author.name}
							</option>
						))}
					</select>
				</label>
				<label htmlFor='born'>
					<input
						type='number'
						name='born'
						id='born'
						value={born}
						onChange={(e) => {
							setBorn(parseInt(e.target.value));
						}}
					/>
				</label>
				<button type='submit'>Submit</button>
			</form>
		</div>
	);
};
export default Birthyear;
