import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createAnecdote } from '../requests';
import { useContext } from 'react';
import AnecdoteContext from '../AnecdoteContext';

const AnecdoteForm = () => {
	const queryClient = useQueryClient();

	const newAnecdoteMutation = useMutation({
		mutationFn: createAnecdote,
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData(['anecdotes']);
			queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote));
		},
		onError: (error) => {
			dispatch({ type: 'ERROR', error: error?.response?.data?.error, duration: 5000 });
		},
	});

	const [notification, dispatch] = useContext(AnecdoteContext);

	const onCreate = async (e) => {
		e.preventDefault();
		const content = e.target.anecdote.value;
		e.target.anecdote.value = '';
		newAnecdoteMutation.mutate({ content, votes: 0 });
		dispatch({ type: 'CREATE', anecdote: content, duration: 5000 });
	};

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	);
};

export default AnecdoteForm;
