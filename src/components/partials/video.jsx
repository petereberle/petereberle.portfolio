import * as React from "react"

const Video = ({source, title, classes}) => (
	
	<video className={classes} loop autoPlay muted>
		<source src={source} type="video/mp4" />
	</video>

)

export default Video