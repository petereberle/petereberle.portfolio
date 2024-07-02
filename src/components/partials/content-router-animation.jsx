import * as React from "react"

import {motion} from "framer-motion"

import Footer from "../footer"

import * as containerStyles from "../styles/containers.module.css"

const ContentRouterAnimation = ({children, urlParam}) => {

	const 	pathName = urlParam.pathname,
			hash = urlParam.hash ? urlParam.hash.substring(1) : null,
			hashValues = {next: "nextpost", prev: "previouspost"},
			exceptions = pathName.includes('/artwork/') || pathName.includes('/projects/'),
			translateValue = 500,
			animationDirection = ({pathName, hash, initial, exit}) => { 

				if (initial) {

					return hash === hashValues.next ? translateValue : hash === hashValues.prev ? -translateValue : -translateValue

				} else if (exit) {

			 		return (exceptions && pathName.length > 10) || hash === hashValues.next || hash === hashValues.prev ? 0 : translateValue

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
	    <div className={!exceptions ? containerStyles.content_section : ''}>
	     	{children}
	    </div>

	    <Footer urlParam={pathName}/>


    </motion.div>
    )

}

export default ContentRouterAnimation