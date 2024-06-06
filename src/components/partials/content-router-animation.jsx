import React from "react"

import {motion} from "framer-motion"

import * as containerStyles from "../styles/containers.module.css"

const ContentRouterAnimation = ({children, urlParam}) => {

	const 	pathName = urlParam.pathname,
			hash = urlParam.hash ? urlParam.hash.substring(1) : null,
			translateValue = 500,
			animationDirection = ({pathName, hash, initial, exit}) => { 

				if (initial) {

					return hash === 'next_project' ? translateValue : hash === 'previous_project' ? -translateValue : -translateValue

				} else if (exit) {

			 		return (pathName.includes('/projects/') && pathName.length > 10) || hash === 'next_project' || hash === 'previous_project' ? 0 : translateValue

			 	}

			}
	
	return (
	  <motion.div
	      initial={{ opacity: 0, x: animationDirection({ pathName: pathName, hash: hash, initial:true, exit:false }) }}
	      animate={{ opacity: 1, x: 0 }}
	      exit = {{ opacity: 0, x: animationDirection({ pathName: pathName, hash: hash, initial:false, exit:true }) }}
	      transition={{
	        type: "spring",
	        mass: 0.35,
	        stiffness: 75,
	        duration: 0.3,
	      }}
    >
	    <div className={pathName !== '/projects/' ? containerStyles.content_section : ''}>
	     	{children}
	    </div>
    </motion.div>
    )

}

export default ContentRouterAnimation