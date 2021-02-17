import { connect } from "react-redux";

export const getPost = (payload) => {
	const content = { posts: payload.posts };
	return {
		type: "GET_POST",
		...content,
	};
};
export const addPost = (payload) => {
	const content = { posts: payload.posts };
	return {
		type: "ADD_POST",
		...content,
	};
};
export const getAfter = (after) => {
	return {
		type: "GET_AFTER",
		after,
	};
};
