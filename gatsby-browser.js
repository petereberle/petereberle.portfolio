import "./src/components/styles/global.css"

import * as React from "react"

import * as ReactDOM from "react-dom/client"

import { AnimatePresence } from "framer-motion"

export const replaceHydrateFunction = () => {
  return (element, container) => {
    const root = ReactDOM.createRoot(container)
    root.render(element)
  }
}

export const wrapPageElement = ({ element }) => {

	return ( 

	<>

		<AnimatePresence mode="wait">

				{element}

		</AnimatePresence>

	</>

	)

}

