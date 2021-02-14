// Default
import { useState, useEffect } from "react";
import axios from "axios";

// CSS
import "./ShowComments.scss";

const ShowComments = (props) => {
	// State
	const [collapse, setCollapse] = useState(false);
	// Handle
	const handleClick = () => {
		setCollapse((prev) => !prev);
	};

	return (
		<div className="comments-box">
			<div className="comments-show-button">
				<button onClick={handleClick}>
					<i class="far fa-comment-dots"></i>Comments
				</button>
			</div>

			{collapse && <Comments data={props.data} />}
		</div>
	);
};
const Comments = (props) => {
	// State
	const subreddit = props.data.subreddit;
	const article = props.data.id;
	const [comments, setComments] = useState([]);
	// On Mount
	useEffect(() => {
		axios
			.get(
				`https://www.reddit.com/r/${subreddit}/comments/${article}.json?limit=10`
			)
			.then((response) => {
				setComments(response.data[1].data.children);
			});
	}, []);

	return (
		<div className="comments-main-container">
			<ul>
				{comments.map((el, i) => {
					return (
						<li key={i}>
							<div className="comments">
								<div className="comments-votes">
									<div className="votes-up">
										<p>{el.data.ups}</p>
									</div>
									<div className="votes-down">
										<p>{el.data.downs}</p>
									</div>
								</div>
								<div className="comments-body">
									<h5>{el.data.author}</h5>
									<p>{el.data.body}</p>
									<div className="comments-children">
										{el.data.replies ? (
											<CommentChildren data={el.data.replies.data} />
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
const CommentChildren = (props) => {
	const [collapse, setCollapse] = useState(false);
	const handleClick = () => {
		setCollapse((prev) => !prev);
	};
	if (collapse) {
		return (
			<div className="comments-container">
				<div className="hide-comments-button">
					<i className="fas fa-plus-square" onClick={handleClick}></i>
				</div>

				<ul>
					{props.data.children.map((el, i) => {
						return (
							<li>
								<div className="comments">
									<div className="comments-votes">
										<div className="votes-up">
											<p>{el.data.ups}</p>
										</div>
										<div className="votes-down">
											<p>{el.data.downs}</p>
										</div>
									</div>
									<div className="comments-body">
										<h5>{el.data.author}</h5>
										<p>{el.data.body}</p>
										<div className="comments-children">
											{el.data.replies ? (
												<CommentChildren data={el.data.replies.data} />
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
			<i className="fas fa-minus-square" onClick={handleClick}></i>
		</div>
	);
};
export default ShowComments;
