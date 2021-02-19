// Default
const Embed = (props) => {
	var embed = document.createElement("textarea");
	embed.innerHTML = props.data;

	return (
		<div
			className="embed-container"
			dangerouslySetInnerHTML={{ __html: embed.value }}
		></div>
	);
};
const Player = (props) => {
	if (props.data.url.includes(".gifv")) {
		let url = props.data.url.replace(".gifv", ".mp4");
		return (
			<video className="post-media" autoPlay loop alt="" src={url}></video>
		);
	} else if (props.data.media_embed.content) {
		return <Embed data={props.data.media_embed.content} />;
	} else if (props.data.url.match(/.(jpg|jpeg|png|gif)$/i)) {
		return <img style={{ maxWidth: "100%" }} alt="" src={props.data.url}></img>;
	} else {
		return null;
	}
};
const Media = (props) => {
	return <Player data={props.data} />;
};
export default Media;
