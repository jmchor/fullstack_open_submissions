import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { showNotification, hideNotification } from '../reducers/notificationReducer';
import { timedNotification } from '../reducers/notificationReducer.js';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const addAnecdote = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		dispatch(createAnecdote(content));
		dispatch(timedNotification(`Created anecdote: ${content}`, 5));
	};
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={addAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
