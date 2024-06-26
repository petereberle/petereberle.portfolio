import * as React from "react"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"

import {useStaticQuery, graphql} from "gatsby"

const SocialMedia = () => {
	
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
  			social = markdownRemark.frontmatter.social_media,
  			SocialLinks = () => (

  				social.map( (s, i) => {

  					return <a key={i} className={`${generalStyles.margin} ${generalStyles.tag} ${generalStyles.theme_background_color} ${containerStyles.flex_column} ${containerStyles.align_center}`} href={s.link} target="_blank">

  						<img className={mediaStyles.icon} src={s.icon.publicURL} alt={s.name}/>

  					</a>

  				} )

  			)



  return (

  	<div className={`${containerStyles.flex_column} ${containerStyles.align_start} ${containerStyles.justify_center} ${generalStyles.position_fixed} ${generalStyles.margin}`}>
  		<small>{markdownRemark.frontmatter.title}</small>
  		<div className={containerStyles.flex_row}>
  			<SocialLinks />
  		</div>
  	</div>

  	)

}

export default SocialMedia