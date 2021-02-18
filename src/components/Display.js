// Default
import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// Actions
import { addPost } from "../actions";
// Comp
import Posts from "./Posts";
// CSS

const Display = (props) => {
	// State
	const observedRef = useRef(null);
	const posts = useSelector((state) => state.postReducer.posts);
	const dispatch = useDispatch();

	const { after, setAfter } = props;

	//Handle
	const getNewPosts = () => {
		axios
			.get(
				`https://www.reddit.com/r/${props.subreddit}.json?limit=5&after=${after}`
			)
			.then((response) => {
				console.log(after);
				setAfter(response.data.data.after);
				dispatch(addPost({ posts: response.data.data }));
			});
	};

	const handleKeyUp = (e) => {
		if (e.key === "ArrowRight") {
			getNewPosts();
		}
	};

	// Render
	useEffect(() => {
		let observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						console.log(entry.isIntersecting);
						console.log(entry.intersectionRatio);
						getNewPosts();
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold: 0.3 }
		);

		if (observedRef.current) {
			observer.observe(observedRef.current);
		}

		window.addEventListener("keyup", handleKeyUp);
		return () => {
			window.removeEventListener("keyup", handleKeyUp);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [posts]);

	return (
		<div>
			{posts.map((el, i) => {
				return el.posts.children.map((el, i) => {
					return (
						<div ref={observedRef} key={i}>
							<Posts posts={el} />
						</div>
					);
				});
			})}
		</div>
	);
};
export default Display;
