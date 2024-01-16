import { createContext, useReducer } from 'react';

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'VOTE':
			return { message: `Voted for ${action.anecdote}`, duration: action.duration || 5000 };
		case 'CREATE':
			return { message: `Created new anecdote: ${action.anecdote}`, duration: action.duration || 5000 };
		case 'ERROR':
			return { message: `${action.error}`, duration: action.duration || 5000 };
		case 'CLEAR':
			return null;
		default:
			return state;
	}
};

const AnecdoteContext = createContext();

export const AnecdoteContextProvider = (props) => {
	const [notification, messageDispatch] = useReducer(notificationReducer, true);

	return <AnecdoteContext.Provider value={[notification, messageDispatch]}>{props.children}</AnecdoteContext.Provider>;
};

export default AnecdoteContext;
