import React, {useEffect} from "react"

import Granim from "granim"

import {AnimatePresence, motion} from "framer-motion"

import useClientState from "./use-client"

import * as headerStyles from "../styles/header.module.css"
import * as generalStyles from "../styles/general.module.css"

const GradientBackground = () => {
	
	const 	client = useClientState(),
			gradientDomId = 'gradient_bg',
			clientGradient = client ? document.getElementById(gradientDomId) : false ;

	useEffect( () => {

		var	granimInstance = clientGradient ? new Granim({
			    element: clientGradient,
			    direction: 'diagonal',
			    isPausedWhenNotInView: true,
			    states : {
			        "default-state": {
			            gradients: [
			                ['#FBAD18', '#f4642a'],
			                ['#81cbeb', '#f46626'],
			                ['#EA9B1C', '#FBAD18']
			            ],
			            transitionSpeed: 2000
			        }
			    }
		}) : null

	},[clientGradient])

	return (

	<AnimatePresence mode="wait">

		<motion.div
		      initial={{ opacity: 0 }}
		      animate={{ opacity: 1 }}
		      exit = {{ opacity: 0 }}
		      transition={{
		        type: "spring",
		        mass: 0.35,
		        stiffness: 75,
		        duration: 0.3,
		      }}
		      className={headerStyles.granim_wrapper}
	    >
			<canvas id={gradientDomId} className={headerStyles.granim_canvas}></canvas>

		</motion.div> 

	</AnimatePresence> 

	)
}

export default GradientBackground;