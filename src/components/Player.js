// Default

// CSS

const Embed = (props) => {
	var embed = document.createElement("textarea");
	embed.innerHTML = props.data;

	return (
		<div
			className="Container"
			dangerouslySetInnerHTML={{ __html: embed.value }}
		></div>
	);
};

const Player = (props) => {
	if (props.data.url.includes(".gifv")) {
		let url = props.data.url.replace(".gifv", ".mp4");
		return (
			<video
				autoPlay
				loop
				alt=""
				src={url}
				style={{ heigh: "300px", width: "300px" }}
			></video>
		);
	} else if (props.data.media_embed.content) {
		return <Embed data={props.data.media_embed.content} />;
	} else {
		return (
			<img
				alt=""
				src={props.data.url}
				style={{ heigh: "300px", width: "300px" }}
			></img>
		);
	}
};
export default Player;
