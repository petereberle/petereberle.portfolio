import * as React from "react"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"

import {useStaticQuery, graphql} from "gatsby"

const SocialMedia = ({currentPage}) => {
	
  const 	{markdownRemark} = useStaticQuery(graphql`
		        query Social {
		            markdownRemark(frontmatter: { type: { eq: "social" } }) {
		              frontmatter {
		              	title
		                social_media {
		                	name
		                	link
		                	icon {
		                		publicURL
		                		extension
		                	}
		                }
		              }
		            }
		          }`
		   	),
  			isPost = currentPage.split('/').length - 1 <= 2,
  			social = markdownRemark.frontmatter.social_media,
  			SocialLinks = () => (

  				social.map( (s, i) => {

  					return <a key={i} className={`${generalStyles.margin} ${generalStyles.tag} ${generalStyles.theme_background} ${ isPost ? generalStyles.theme_background_primary : generalStyles.theme_background_secondary } ${containerStyles.flex_column} ${containerStyles.align_center}`} href={s.link} rel="noreferrer" target="_blank">

  						<small>{s.name}</small>

  					</a>

  				} )

  			)

  return (

  	<div className={` ${containerStyles.align_start} ${containerStyles.justify_center} ${generalStyles.margin}`}>
  		{/*<small>{markdownRemark.frontmatter.title}</small>*/}
  		<div className={`${containerStyles.flex_row} ${generalStyles.margin_negative}`}>
  			<SocialLinks />
  		</div>
  	</div>

  	)

}

export default SocialMedia