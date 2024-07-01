import * as React from "react"

import SocialMedia from "./partials/social-media"

import * as generalStyles from "./styles/general.module.css"
import * as containerStyles from "./styles/containers.module.css"
import * as headerStyles from "./styles/header.module.css"

const Footer = ({urlParam}) => {

	const isPost = urlParam.split('/').length - 1 <= 2;

	return (


		<div className={`${containerStyles.footer} ${containerStyles.grid} ${containerStyles._50_50} ${containerStyles.align_center} ${generalStyles.margin} ${generalStyles.border_item} ${generalStyles.theme_background} ${ isPost ? generalStyles.theme_background_primary : generalStyles.theme_background_secondary }`}>

			<h1 className={generalStyles.margin} >Get in touch with me</h1>

			<SocialMedia currentPage={urlParam} />

		</div>


	)

}

export default Footer