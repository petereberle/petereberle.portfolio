import * as React from "react"

import {useStaticQuery, graphql, Link} from "gatsby"

import SocialMedia from "./partials/social-media"

import * as generalStyles from "./styles/general.module.css"
import * as headerStyles from "./styles/header.module.css"
import * as containerStyles from "./styles/containers.module.css"

const Footer = ({urlParam}) => {

	const 	isPost = urlParam.split('/').length - 1 <= 2,
			isHome = urlParam === '/',
			isContact = urlParam.includes('contact'),
			{websiteStatement, contact} = useStaticQuery(graphql`

		    query {
		      websiteStatement:
	            markdownRemark(frontmatter: { type: { eq: "website statement" } }) {
	              html
	              frontmatter {
	              	title
	              }
	            }
	          contact:
	            markdownRemark(frontmatter: { type: { eq: "contact" } }) {
	              frontmatter {
	              	message
	              	email
	              	phone
	              }
	            }
	        }
           `),
			contactInfo = contact.frontmatter,
			statement = websiteStatement.frontmatter;

	return (


		<div className={`${containerStyles.footer} ${!isPost ? headerStyles.head_space : ''} ${containerStyles.grid} ${containerStyles._6_col_auto_row} ${containerStyles.align_start} ${containerStyles.justify_center} ${generalStyles.margin}`}>

			<Link className={`${containerStyles.grid_item} ${isPost ? generalStyles.theme_background_primary : generalStyles.theme_background_secondary } ${containerStyles.align_center}`} to={isContact ? '/' : '/contact/'}>
  				{isContact ? 'Go Home (:' : 'Contact'}
  			</Link>

			<SocialMedia currentPage={urlParam} />

  			<div className={`${containerStyles.flex_column} ${containerStyles.grid_item} ${containerStyles.statement}`}>
				<h3>
					{statement.title}
				</h3>
				<div className={generalStyles.post_html} dangerouslySetInnerHTML={{__html: websiteStatement.html }}/>
			</div>

		</div>


	)

}

export default Footer