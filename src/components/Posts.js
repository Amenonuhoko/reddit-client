// Default

// Components

import Content from "./Content";

// CSS

const Posts = (props) => {
	const { posts } = props;

	return (
		<div className="post-cards">
			{/* TITLE */}
			<div className="post-header">
				<div className="post-header-title">
					<h2>{posts.data.title}</h2>
					<a href={posts.data.url}>{posts.data.url}</a>
				</div>
				<div className="post-header-details">
					<div className="votes">
						<div className="votes-up">
							<div className="up">
								<i className="fas fa-caret-up"></i>
							</div>

							<p>{posts.data.ups}</p>
							<div className="down">
								<i className="fas fa-caret-down"></i>
							</div>
						</div>
					</div>
					<div className="post-header-details-middle">
						<div className="post-header-details-categories"></div>
						{posts.data.link_flair_text ? (
							<ul>
								<li>
									<h3>{posts.data.link_flair_text}</h3>
								</li>
							</ul>
						) : null}
					</div>
					<div className="post-header-details-right">
						<h4>{posts.data.subreddit}</h4>
						<p>{posts.data.author}</p>
					</div>
				</div>
			</div>
			{/* CONTENT */}
			<div className="post-content">
				<Content posts={posts} />
			</div>
		</div>
	);
};
export default Posts;
