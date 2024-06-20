import * as React from "react"

const Video = ({source, title, classes}) => {
	
	return <video className={classes} loop autoPlay muted webkit-playsinline="webkit-playsinline" playsInline>
		<source src={source} type="video/mp4" />
	</video>

}

export default Video