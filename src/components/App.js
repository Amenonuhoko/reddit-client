// Default
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
// Components
import Posts from "./Posts";
// CSS

const App = () => {
	// State
	const [posts, setPosts] = useState([]);
	const [input, setInput] = useState("");
	const [after, setAfter] = useState("");
	const [before, setBefore] = useState("");

	// Handle
	const handleChange = (e) => {
		setInput(e.target.value);
	};
	const handleSubmit = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			axios
				.get(`https://www.reddit.com/r/${input}.json?limit=5`)
				.then((response) => {
					setAfter(response.data.data.after);
					setPosts(response.data.data.children);
				});
		}
	};
	const handleKeyDown = (e) => {
		if (e.key === "ArrowRight") {
			axios
				.get(`https://www.reddit.com/r/${input}.json?limit=5&after=${after}`)
				.then((response) => {
					setBefore(response.data.data.before);
					setAfter(response.data.data.after);
					setPosts(response.data.data.children);
				});
		} else if (e.key === "ArrowLeft") {
			axios
				.get(`https://www.reddit.com/r/${input}.json?limit=5&before=${before}`)
				.then((response) => {
					setBefore(response.data.data.before);
					setAfter(response.data.data.after);
					setPosts(response.data.data.children);
				});
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	});
	return (
		<div className="App">
			<header className="App-header">
				<div className="search-bar">
					<form>
						<label>
							<i className="fas fa-search"></i>
						</label>
						<input
							placeholder="Type Subreddit Here"
							type="text"
							value={input}
							onChange={handleChange}
							onKeyDown={handleSubmit}
							autoComplete="none"
						></input>
					</form>
				</div>
				<Posts posts={posts} />
			</header>
		</div>
	);
};

export default App;
