import {useState, useEffect} from "react"

const useClientState = () => {

	const [hasMounted, setHasMounted] = useState(false);


	useEffect( () => {


		setHasMounted(true);


	},[] )


	return hasMounted

}

export default useClientState