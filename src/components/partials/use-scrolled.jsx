import React, {useEffect, useState} from "react"

import useClientState from "./use-client"

const useScrolled = () => {
	
	const 	[isScrolled, setIsScrolled] = useState({value: undefined}),
			client = useClientState();

	useEffect( () => {

		if(!client) {return}

		const handleScroll = () => {

			const getScroll = window.scrollY;

			setIsScrolled({value: getScroll})

		}

		handleScroll()

		window.addEventListener("scroll", handleScroll);

		return () => window.removeEventListener("resize", handleScroll)

	},[client])

	return isScrolled;

}

export default useScrolled