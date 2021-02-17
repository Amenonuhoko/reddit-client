// Default
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
// Actions
import { getPost } from "../actions";
// CSS
import "./App.scss";
// Components
import Display from "./Display";

const App = () => {
	// State
	const [loading, setLoading] = useState(false);
	const loadingStyle = { display: loading ? "block" : "none" };
	const [input, setInput] = useState("");
	const [after, setAfter] = useState(null);

	const dispatch = useDispatch();
	// Functions
	const getInitPosts = () => {
		setLoading(true);
		axios
			.get(`https://www.reddit.com/r/${input}.json?limit=5`)
			.then((response) => {
				setLoading(false);
				setAfter(response.data.data.after);
				dispatch(getPost({ posts: response.data.data }));
			});
	};

	// Handle
	const handleChange = (e) => {
		setInput(e.target.value);
	};
	const handleSubmit = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			getInitPosts();
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<div className="search-bar">
					<form>
						<label>
							<i className="fas fa-search"></i>
						</label>
						<input
							data-min="10"
							data-max="50"
							max-size="20"
							placeholder="Type Subreddit Here"
							type="text"
							value={input}
							onChange={handleChange}
							onKeyDown={handleSubmit}
							autoComplete="none"
						></input>
					</form>
				</div>
				<div className="loading" style={loadingStyle}>
					<h1 style={{ textAlign: "center" }}>Loading</h1>
				</div>
				<Display after={after} setAfter={setAfter} subreddit={input} />
			</header>
		</div>
	);
};

export default App;
