import * as React from "react"

import {useStaticQuery, graphql, Link} from "gatsby"

import SocialMedia from "./partials/social-media"

import * as generalStyles from "./styles/general.module.css"
import * as headerStyles from "./styles/header.module.css"
import * as containerStyles from "./styles/containers.module.css"

const Footer = ({urlParam}) => {

	const 	{websiteStatement} = useStaticQuery(graphql`

		    query {
		      websiteStatement:
	            markdownRemark(frontmatter: { type: { eq: "website statement" } }) {
	              html
	              frontmatter {
	              	title
	              }
	            }
	        }
           `),
			statement = websiteStatement.frontmatter;

	return (


		<div className={`${headerStyles.header} ${containerStyles.footer} ${containerStyles.flex_row} ${containerStyles.full_width} ${containerStyles.justify_end} ${headerStyles.menu_list}`}>

			<SocialMedia currentPage={urlParam} />

		</div>


	)

}

export default Footer