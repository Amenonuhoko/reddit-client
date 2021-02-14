// Default

// Components
import Player from "./Player";
import ShowComments from "./ShowComments";
import Media from "./Media";
// CSS
import "./Posts.scss";

const Posts = (props) => {
	return props.posts.map((el, i) => {
		return (
			<div key={i}>
				<li className="post-cards">
					{/* TITLE */}
					<div className="post-title">
						<h3>{el.data.title}</h3>
						<a href={el.data.url}>{el.data.url}</a>
					</div>
					{/* CONTENT */}
					<div className="post-content">
						<div className="content">
							<div className="post-details">
								<div className="comments-votes">
									<div className="votes-up">
										<p>{el.data.ups}</p>
									</div>
									<div className="votes-down">
										<p>{el.data.downs}</p>
									</div>
								</div>
								<div>
									<h4>{el.data.subreddit}</h4>
									{el.data.link_flair_text ? (
										<ul className="categories">
											<li>
												<span>{el.data.link_flair_text}</span>
											</li>
										</ul>
									) : null}
								</div>

								<p>{el.data.author}</p>
							</div>
							<div className="post-show-comments">
								<ShowComments data={el.data} />
							</div>
						</div>
						{el.data.url.includes(`r/${el.data.subreddit}/comments`) ? null : (
							<Media data={el.data} />
						)}
					</div>
				</li>
			</div>
		);
	});
};
export default Posts;
