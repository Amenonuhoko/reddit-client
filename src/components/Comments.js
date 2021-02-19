// Default
import { useState, useEffect } from "react";
import axios from "axios";

// CSS

const Comments = (props) => {
	// State
	const [collapse, setCollapse] = useState(false);
	// Handle
	const handleClick = () => {
		setCollapse((prev) => !prev);
	};

	return (
		<div className="comments">
			<div className="comments-show-button">
				<button onClick={handleClick}>
					{props.data.num_comments} Comments{" "}
					<i className="far fa-comment-dots"></i>
				</button>
			</div>

			{collapse && <CommentsBody data={props.data} />}
			{collapse && (
				<div className="comments-hide-button">
					<button onClick={handleClick}>
						<i className="far fa-times-circle"></i>
					</button>
				</div>
			)}
		</div>
	);
};
const CommentsBody = (props) => {
	// State
	const subreddit = props.data.subreddit;
	const article = props.data.id;
	const [comments, setComments] = useState([]);
	// On Mount
	useEffect(() => {
		axios
			.get(
				`https://www.reddit.com/r/${subreddit}/comments/${article}.json?limit=50`
			)
			.then((response) => {
				setComments(response.data[1].data.children);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="comments-container">
			<ul>
				{comments.map((el, i) => {
					return (
						<li key={i}>
							<div className="comments-parent">
								<div className="comments-votes">
									<div className="votes-up">
										<p>{el.data.ups}</p>
									</div>
									<div className="votes-down">
										<p>{el.data.downs}</p>
									</div>
								</div>
								<div className="comments-parent-body">
									<h5>{el.data.author}</h5>
									<p>{el.data.body}</p>
									<div className="comments-children">
										{el.data.replies ? (
											<CommentsChildren data={el.data.replies.data} />
										) : null}
									</div>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
const CommentsChildren = (props) => {
	const [collapse, setCollapse] = useState(false);
	const handleClick = () => {
		setCollapse((prev) => !prev);
	};
	if (collapse) {
		return (
			<div className="comments-child-container">
				<div className="hide-comments-button">
					<i className="far fa-minus-square" onClick={handleClick}></i>
				</div>

				<ul>
					{props.data.children.map((el, i) => {
						return (
							<li>
								<div className="comments-parent">
									<div className="comments-votes">
										<div className="votes-up">
											<p>{el.data.ups}</p>
										</div>
										<div className="votes-down">
											<p>{el.data.downs}</p>
										</div>
									</div>
									<div className="comments-parent-body">
										<h5>{el.data.author}</h5>
										<p>{el.data.body}</p>
										<div className="comments-children">
											{el.data.replies ? (
												<CommentsChildren data={el.data.replies.data} />
											) : null}
										</div>
									</div>
								</div>
							</li>
						);
					})}
				</ul>
			</div>
		);
	}
	return (
		<div className="hide-comments-button">
			<i className="far fa-plus-square" onClick={handleClick}></i>
		</div>
	);
};
export default Comments;
