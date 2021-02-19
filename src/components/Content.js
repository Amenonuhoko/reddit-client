import { useState } from "react";

import Media from "./Media";
import Comments from "./Comments";

const Content = (props) => {
	const [zoomed, setZoomed] = useState(false);
	const { posts } = props;

	const handleClick = () => {
		setZoomed((prev) => !prev);
	};
	return (
		<snap-tabs>
			<section className="scroll-snap-x">
				<article id="media">
					<div className={zoomed ? "zoomed" : ""} onClick={handleClick}>
						<Media data={posts.data} />
					</div>
				</article>

				<article id="comment">
					<Comments data={posts.data} />
				</article>
			</section>
		</snap-tabs>
	);
};
export default Content;
