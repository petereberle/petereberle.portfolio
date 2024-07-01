import * as React from "React"

import {motion} from "framer-motion"

import {Link} from "gatsby"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"

const MotionLink = motion(Link);

const Card = ({children, className, link}) => {
	
return	<MotionLink 
		layout
	    initial={{ transform: "scale(0)" }}
	    animate={{ transform: "scale(1)" }}
	    exit={{ transform: "scale(0)" }}
	    transition={{
	        type: "spring",
	        mass: 0.35,
	        stiffness: 75,
	        duration: 0.3,
	  	}}
		to={`/${link}`} className={`${className} ${containerStyles.card} ${containerStyles.grid_item}`}>
		
		<div className={`${containerStyles.card_wrapper}`}>
			{children}
		</div>

	</MotionLink>


}

export default Card