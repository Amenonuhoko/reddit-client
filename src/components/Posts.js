// Default

// Components
import Comments from "./Comments";
import Media from "./Media";
// CSS
import "./Posts.scss";

const Posts = (props) => {
	return props.posts.map((el, i) => {
		return (
			<div key={i}>
				<li className="post-cards">
					{/* TITLE */}
					<div className="post-header">
						<div className="post-header-title">
							<h2>{el.data.title}</h2>
							<a href={el.data.url}>{el.data.url}</a>
						</div>
						<div className="post-header-details">
							<div className="votes">
								<div className="votes-up">
									<p>{el.data.ups}</p>
								</div>
								<div className="votes-down">
									<p>{el.data.downs}</p>
								</div>
							</div>
							<div className="post-header-details-middle">
								<div className="post-header-details-categories"></div>
								{el.data.link_flair_text ? (
									<ul>
										<li>
											<h3>{el.data.link_flair_text}</h3>
										</li>
									</ul>
								) : null}
							</div>
							<div className="post-header-details-right">
								<h4>{el.data.subreddit}</h4>
								<p>{el.data.author}</p>
							</div>
						</div>
					</div>
					{/* CONTENT */}
					<div className="post-content">
						{el.data.thumbnail && (
							<div className="post-content-left">
								<Media data={el.data} />
							</div>
						)}

						<div className="post-content-right">
							<div className="post-content-right-comments">
								<Comments data={el.data} />
							</div>
						</div>
					</div>
				</li>
			</div>
		);
	});
};
export default Posts;
