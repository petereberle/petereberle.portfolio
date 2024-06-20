import {useState, useEffect} from "react"

const useWindowWidth = () => {

	const 	[windowWidth, setWindowWidth] = useState({value:undefined}),
			windowGlobal = typeof window !== 'undefined';

	useEffect( () => {

		if (!windowGlobal) { return }

		const handleResize = () => {

			const getWidth = window.innerWidth;

			setWindowWidth({value:getWidth})

		}

		handleResize()

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);

	 },[]);

	return windowWidth;
}


export default useWindowWidth;