import Player from "./Player";

const Media = (props) => {
	return (
		<div className="post-media">
			<div className="post-player">
				<Player data={props.data} />
			</div>
		</div>
	);
};
export default Media;
