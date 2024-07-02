			[getPreviousHash, setPreviousHash] = useState(''),
			animationDirection = ({hash, initial, exit}) => { 

				if (initial) {

					return hash === 'nextpost' ? translateValue : hash === 'previouspost' ? -translateValue : translateValue

				} else if (exit) {

			 		return hash === 'nextpost' ? -translateValue : hash === 'previouspost' ? translateValue : -translateValue

			 	}

			}

	useEffect( () => {

		setPreviousHash(hash)

	},[hash])