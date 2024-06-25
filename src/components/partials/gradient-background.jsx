import React, {useEffect} from "react"

import Granim from "granim"

import {motion} from "framer-motion"

import useClientState from "./use-client"

import * as headerStyles from "../styles/header.module.css"

const GradientBackground = ({currentPage}) => {
	
	const 	client = useClientState(),
			gradientDomId = 'gradient_bg',
			clientGradient = client ? document.getElementById(gradientDomId) : false ;

	useEffect( () => {

		var	granimInstance = clientGradient ? new Granim({
			    element: clientGradient,
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
			            gradients: [
			                ['#FBAD18', '#f4642a'],
			                ['#F79A85', '#f46626'],
			                ['#EA9B1C', '#FBAD18']
			            ],
			            transitionSpeed: 2000
			        },
			        "after-post-load-state": {
			            gradients: [
			                ['#BBD0E5', '#CDE1DC'],
			                ['#EEF5FC', '#81C7CF'],
			                ['#8ED8F8', '#E5F1F3']
			            ],
			            transitionSpeed: 2000
			        }
			    }

		}) : null

		if ( currentPage.split('/').length - 1 <= 2 ) {

			granimInstance?.changeState("after-load-state")

		} else {

			granimInstance?.changeState("after-post-load-state")

		}

	},[clientGradient])

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
			     className={headerStyles.granim_canvas}
		    >

			</motion.canvas> 

		

	</div>

	)
}

export default GradientBackground;