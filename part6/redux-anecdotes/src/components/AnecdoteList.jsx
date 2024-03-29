import { updateAnecdoteVote } from '../reducers/anecdoteReducer';
import { useDispatch, useSelector } from 'react-redux';
import { timedNotification } from '../reducers/notificationReducer.js';

const AnecdoteList = () => {
	//thanks to the combined reducer, the destructured anecdotes and filter here refer to the state which is provided by the anecdote reducer and the filter reducer
	const anecdotes = useSelector(({ anecdotes, filter }) =>
		anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter)).sort((a, b) => b.votes - a.votes)
	);
	const dispatch = useDispatch();

	const vote = (id) => {
		console.log('vote', id);
		const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id);

		if (votedAnecdote) {
			dispatch(updateAnecdoteVote(votedAnecdote));
			dispatch(timedNotification(`You voted for ${votedAnecdote.content}`, 5));
		}
	};
	return (
		<div>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => vote(anecdote.id)}>vote</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default AnecdoteList;
