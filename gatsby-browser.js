import "./src/components/styles/global.css"

import React, {useEffect}  from "react"

import ReactDOM from "react-dom/client"

import useClientState from "./src/components/partials/use-client"

import Granim from "granim"

import { AnimatePresence } from "framer-motion"

const GradientBackground  = () => {

		const client = useClientState();

		const clientElement = useClientState() ? document.getElementById('gradient_bg') : false ;

		useEffect( () => {

			var	granimInstance = clientElement ? new Granim({
				    element: '#gradient_bg',
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

		console.log(clientElement + ' use effect')

	},[ useClientState() ])

	console.log(useClientState())

}

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}

export const wrapPageElement = ({ element }) => {

	// GradientBackground()

	return ( 

	<>

	<AnimatePresence mode="wait">

			{element}

	</AnimatePresence>

	</>

	)

}

