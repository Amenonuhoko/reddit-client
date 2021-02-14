// Default

// Components
import Player from "./Player";
import ShowComments from "./ShowComments";
// CSS
import "./Posts.css";

const Posts = (props) => {
	return props.posts.map((el, i) => {
		return (
			<div key={i}>
				<li className="post-cards">
					{/* TITLE */}
					<div className="post-title">
						<h3 style={{ textAlign: "center" }}>{el.data.title}</h3>
					</div>
					{/* CONTENT */}
					<div className="post-content">
						<div className="content">
							<ul>
								<li>{el.data.content_categories}</li>
							</ul>
							<div className="show-comments">
								<ShowComments data={el.data} />
							</div>
						</div>

						<div className="post-media">
							<Player data={el.data} />
						</div>
					</div>
				</li>
			</div>
		);
	});
};
export default Posts;
