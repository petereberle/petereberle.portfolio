import "./src/components/styles/global.css"

import React from "react"

import { AnimatePresence } from "framer-motion"

export const wrapPageElement = ({ element }) => {

	const 	location = element.props.location

	return ( 

	<AnimatePresence mode="wait">

			{element}

	</AnimatePresence>

	)

}