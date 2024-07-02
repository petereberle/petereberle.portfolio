import * as React from "react"

const Selector = ({children, layout, path, classes, active, setActive}) => {

	const 	activate = () => {

				const test = ('/' + path).toLowerCase();

				console.log(layout)
				
		    	setActive(!active)

			};

	return (

		<button className={`${classes} ${active ? "active" : ''}`} onClick={activate}>
			{children}
		</button>

	)

}

export default Selector;