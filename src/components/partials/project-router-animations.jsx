			[getPreviousHash, setPreviousHash] = useState(''),
			animationDirection = ({hash, initial, exit}) => { 

				if (initial) {

					return hash === 'next_project' ? translateValue : hash === 'previous_project' ? -translateValue : translateValue

				} else if (exit) {

			 		return hash === 'next_project' ? -translateValue : hash === 'previous_project' ? translateValue : -translateValue

			 	}

			}

	useEffect( () => {

		setPreviousHash(hash)

	},[hash])