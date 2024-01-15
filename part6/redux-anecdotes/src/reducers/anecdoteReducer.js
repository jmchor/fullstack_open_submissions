import { createSlice } from '@reduxjs/toolkit';

import anecdoteService from '../../services/anecdotes';

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		updateVoteOfAnecdote(state, action) {
			const anecdoteToUpvote = action.payload;
			return state.map((anecdote) => (anecdote.id === anecdoteToUpvote.id ? anecdoteToUpvote : anecdote));
		},

		appendAnecdote(state, action) {
			state.push(action.payload);
		},

		setAnecdotes(state, action) {
			return action.payload;
		},
	},
});

export const { updateVoteOfAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll();
		dispatch(setAnecdotes(anecdotes));
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content);
		dispatch(appendAnecdote(newAnecdote));
	};
};

export const updateAnecdoteVote = (anecdote) => {
	return async (dispatch) => {
		const updatedAnecdote = await anecdoteService.updateVotes(anecdote.id, anecdote);
		dispatch(updateVoteOfAnecdote(updatedAnecdote));
	};
};

export default anecdoteSlice.reducer;

//Old style:

// const anecdotesAtStart = [
// 	'If it hurts, do it more often',
// 	'Adding manpower to a late software project makes it later!',
// 	'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
// 	'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
// 	'Premature optimization is the root of all evil.',
// 	'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
// ];

// const getId = () => (100000 * Math.random()).toFixed(0);

// const asObject = (anecdote) => {
// 	return {
// 		content: anecdote,
// 		id: getId(),
// 		votes: 0,
// 	};
// };

// const initialState = anecdotesAtStart.map(asObject);

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
