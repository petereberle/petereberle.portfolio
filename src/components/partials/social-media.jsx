import * as React from "react"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as headerStyles from "../styles/header.module.css"
import * as mediaStyles from "../styles/media.module.css"


import {useStaticQuery, graphql, Link} from "gatsby"

const SocialMedia = ({currentPage}) => {
	
  const 	{markdownRemark} = useStaticQuery(graphql`
		        query Social {
		            markdownRemark(frontmatter: { type: { eq: "social" } }) {
		              frontmatter {
		              	title
		                social_media {
		                	name
		                	link
		                }
		              }
		            }
		          }`
		   	),
  			social = markdownRemark.frontmatter.social_media,
  			SocialLinks = () => (

  				social.map( (s, i, array) => {

  					return (

  					 <a key={i} className={`${headerStyles.menu_item} ${containerStyles.align_center}`} href={s.link} rel="noreferrer" target="_blank">

  						{s.name}

  					</a>

  					)

  				} )

  			)

  return (

	  	<SocialLinks />
  	)

}

export default SocialMedia