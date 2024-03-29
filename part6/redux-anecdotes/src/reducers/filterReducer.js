import { createSlice } from '@reduxjs/toolkit';

//

const initialState = '';

const filterSlice = createSlice({
	name: 'filter',
	initialState,
	reducers: {
		filterAnecdotes(state, action) {
			return action.payload.toLowerCase();
		},
	},
});

export const { filterAnecdotes } = filterSlice.actions;
export default filterSlice.reducer;

//Old style:
//the state here is an empty string since the search bar starts empty
// const filterReducer = (state = '', action) => {
// 	switch (action.type) {
// 		//as soon as the action FILTER starts, this will be returned
// 		case 'FILTER':
// 			return action.payload.toLowerCase(); // Convert to lowercase here
// 		default:
// 			return state;
// 	}
// };
// //when this function is called, it'll send the GO for an action type FILTER and the payload keyWord
// export const filterAnecdotes = (keyWord) => {
// 	return {
// 		type: 'FILTER',
// 		payload: keyWord,
// 	};
// };

// export default filterReducer;
