import * as React from "react"

import * as containerStyles from "../styles/containers.module.css"

const IndexGrid = ({children}) => {
	
	return <div className={`${containerStyles.index} ${containerStyles.grid}`}>

		{children}

	</div>

}

export default IndexGrid