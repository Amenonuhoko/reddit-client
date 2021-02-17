import { combineReducers } from "redux";

const initialState = {
	posts: [],
};

const postReducer = (state = initialState, action) => {
	switch (action.type) {
		case "GET_POST":
			return { ...state, posts: [...state.posts, { posts: action.posts }] };
		case "ADD_POST":
			return { ...state, posts: [...state.posts, { posts: action.posts }] };
		case "GET_AFTER":
			return { ...state, after: action.after };
		default:
			return state;
	}
};

export default combineReducers({ postReducer });
