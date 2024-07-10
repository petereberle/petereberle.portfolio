import React, {useEffect, useRef} from "react"

import Granim from "granim"

import {motion} from "framer-motion"

import themeColorSets from "../../theme/theme-colorset"

import useClientState from "../hooks/use-client"

import * as headerStyles from "../styles/header.module.css"

const GradientBackground = ({currentPage}) => {
	
	const 	renderRef = useRef(),
			client = useClientState(),
			gradientDomId = 'gradient_bg';

	useEffect( () => {

		var	granimInstance = client ? new Granim({
			    element: renderRef.current,
			    direction: 'diagonal',
			    isPausedWhenNotInView: true,
			    stateTransitionSpeed: 500,
			    states : {
			    	"default-state" : {
			    		gradients : [
			    			['#FFFFFF', '#FFFFFF'],
			                ['#FFFFFF', '#FFFFFF'],
			                ['#FFFFFF', '#FFFFFF']
			    		],
			    		transitionSpeed: 2000
			    	},
			        "after-load-state": {
			            gradients: themeColorSets.pages_gradients,
			            transitionSpeed: 2000
			        },
			        "after-post-load-state": {
			            gradients: themeColorSets.posts_gradients,
			            transitionSpeed: 2000
			        }
			    }

		}) : null

		if ( currentPage.split('/').length - 1 <= 2 ) {

			granimInstance?.changeState("after-load-state")

		} else {

			granimInstance?.changeState("after-post-load-state")

		}

	},[client])

	return (

	<div  className={headerStyles.granim_wrapper} >

			<motion.canvas
			      initial={{ opacity: 0 }}
			      animate={{ opacity: 1 }}
			      exit = {{ opacity: 0 }}
			      transition={{
			        type: "spring",
			        mass: 0.35,
			        stiffness: 75,
			        duration: 0.3,
			      }}
			     id={gradientDomId}
			     ref={renderRef}
			     className={headerStyles.granim_canvas}
		    >

			</motion.canvas> 

		

	</div>

	)
}

export default GradientBackground;