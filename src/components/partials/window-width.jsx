import {useState, useEffect} from "react"

import useClientState from "./use-client"

const useWindowWidth = () => {

	const 	[windowWidth, setWindowWidth] = useState({width:undefined, height: undefined}),
			client = useClientState();

	useEffect( () => {
		

		if (!client) { return }

		const handleResize = () => {

			const 	getWidth = window.innerWidth,
					getHeight = window.innerHeight;

			setWindowWidth({width:getWidth, height: getHeight})

		}

		handleResize()

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);

	 },[client]);

	return windowWidth;
}


export default useWindowWidth;