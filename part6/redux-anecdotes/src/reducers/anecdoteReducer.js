import { createSlice } from '@reduxjs/toolkit';

const anecdotesAtStart = [
	'If it hurts, do it more often',
	'Adding manpower to a late software project makes it later!',
	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
	'Premature optimization is the root of all evil.',
	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
	return {
		content: anecdote,
		id: getId(),
		votes: 0,
	};
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState,
	reducers: {
		createAnecdote(state, action) {
			const content = action.payload;
			state.push({
				content,
				id: getId(),
				votes: 0,
			});
		},
		increaseVoteOf(state, action) {
			const id = action.payload;
			const anecdoteToUpvote = state.find((anecdote) => anecdote.id === id);
			const updatedAnecdote = {
				...anecdoteToUpvote,
				votes: anecdoteToUpvote.votes + 1,
			};

			return state.map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote));
		},
	},
});

export const { createAnecdote, increaseVoteOf } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;

//Old style:

// export const createAnecdote = (content) => {
// 	return {
// 		type: 'CREATE_ANECDOTE',
// 		payload: {
// 			content,
// 			id: getId(),
// 			votes: 0,
// 		},
// 	};
// };

// export const increaseVoteOf = (id) => {
// 	return {
// 		type: 'INCREASE_VOTE',
// 		payload: {
// 			id,
// 		},
// 	};
// };

// const reducer = (state = initialState, action) => {
// 	console.log('action', action);
// 	console.log('state now: ', state);

// 	switch (action.type) {
// 		//increase vote for a single anecdote using the action creator
// 		case 'INCREASE_VOTE':
// 			//we need to single out the anecdote we clicked on by comparing IDs
// 			return state.map((anecdote) =>
// 				//if the ID of an anecdote in the whole array matches the one from the payload
// 				//we spread the anecdotes into an object and only alter the votes key
// 				anecdote.id === action.payload.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote
// 			);
// 		case 'CREATE_ANECDOTE':
// 			return [...state, action.payload];
// 		default:
// 			return state;
// 	}
// };

// export default reducer;
