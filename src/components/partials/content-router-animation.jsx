import * as React from "react"

import {motion, useIsPresent} from "framer-motion"

import Footer from "../footer"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"

const ContentRouterAnimation = ({children, urlParam}) => {

	const isPresent = useIsPresent();

	const 	pathName = urlParam.pathname,
			isPost = pathName.split('/').length - 1 <= 2,
			hash = urlParam.hash ? urlParam.hash.substring(1) : null,
			hashValues = {next: "nextpost", prev: "previouspost"},
			exceptions = pathName.includes('/artwork/') || pathName.includes('/projects/'),
			animationTransition = { 
				type: "spring",
		        mass: 0.5,
		        stiffness: 50,
		        duration: 0.3
	    	},
			animationDirection = ({pathName, hash, initial, exit}) => { 

				if (initial) {

					return hash === hashValues.next ? '100%' : hash === hashValues.prev ? '-100%' : '-100%'

				} else if (exit) {

			 		return (exceptions && pathName.length > 10) || hash === hashValues.next || hash === hashValues.prev ? 0 : '100%'

			 	}

			}
	
	return (

	<>

	  <motion.div
	      initial={{ opacity: 0, x: animationDirection({ pathName: pathName, hash: hash, initial:true, exit:false }) }}
	      animate={{ opacity: 1, x: 0 }}
	      exit = {{ opacity: 0, x: animationDirection({ pathName: pathName, hash: hash, initial:false, exit:true }) }}
	      transition={animationTransition}
    	>
	    <div className={!exceptions ? containerStyles.content_section : ''}>
	     	{children}
	    </div>

	    <Footer urlParam={pathName}/>

    </motion.div>

     <motion.div
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0, transition: animationTransition }}
        exit={{ scaleX: 1, transition: animationTransition }}
        style={{ originX: isPresent && animationDirection({ pathName: pathName, hash: hash, initial:true, exit:false }) === '100%'

         ? 0 : isPresent && animationDirection({ pathName: pathName, hash: hash, initial:true, exit:false }) === '-100%'

         ? 1  

         : 0 

     	}}
        className={`${generalStyles.privacy_screen}`}
        >

        <ul className={`${generalStyles.privacy_loader} ${isPresent ? '' : generalStyles.active }`}>
        	<li className={isPost ? generalStyles.theme_background_primary : generalStyles.theme_background_secondary}/>
        	<li className={isPost ? generalStyles.theme_background_primary : generalStyles.theme_background_secondary}/>
        	<li className={isPost ? generalStyles.theme_background_primary : generalStyles.theme_background_secondary}/>
        </ul>

     </motion.div>

     </>

    )

}

export default ContentRouterAnimation