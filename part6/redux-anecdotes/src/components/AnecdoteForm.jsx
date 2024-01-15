import { createAnecdote } from '../reducers/anecdoteReducer';
import { useDispatch } from 'react-redux';
import { showNotification, hideNotification } from '../reducers/notificationReducer';

const AnecdoteForm = () => {
	const dispatch = useDispatch();

	const newAnecdote = (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		dispatch(createAnecdote(content));
		dispatch(showNotification(`Created anecdote: ${content}`));
		setTimeout(() => {
			dispatch(hideNotification());
		}, 5000);
	};
	return (
		<div>
			<h2>create new</h2>
			<form onSubmit={newAnecdote}>
				<div>
					<input name='anecdote' />
				</div>
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
