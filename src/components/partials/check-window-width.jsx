import {useState, useEffect} from "react"

const useWindowWidth = () => {

	const windowGlobal = typeof window !== 'undefined';

	const [windowWidth, setWindowWidth] = useState({value:undefined});

	useEffect( () => {

		if(!windowGlobal) return

		const handleResize = () => {

			const getWidth = window.innerWidth;

			setWindowWidth({value:getWidth})

			console.log(getWidth)

		}

		handleResize()

		window.addEventListener("resize", handleResize())

		return () => window.removeEventListener("resize", handleResize())

	 },[]);

	return windowWidth;
}


export default useWindowWidth;