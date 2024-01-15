import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const notificationSlice = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		showNotification(state, action) {
			return action.payload;
		},
		hideNotification(state, action) {
			return null;
		},
	},
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

export const timedNotification = (message, time = 5) => {
	return async (dispatch) => {
		let timeout;

		if (timeout) {
			clearTimeout(timeout);
		}
		dispatch(showNotification(message));

		timeout = setTimeout(() => {
			dispatch(hideNotification());
		}, time * 1000);
	};
};
