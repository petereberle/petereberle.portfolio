import React from "react";

import {Link} from "gatsby"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import * as generalStyles from "../../styles/general.module.css"
import * as containerStyles from "../../styles/containers.module.css"
import * as mediaStyles from "../../styles/media.module.css"

const IndexCards = ({project}) => {

	return (

		<>

			{ project.map( (data, i) => {

		  				const 	{node} = data,
		  						{frontmatter, html, fields} = node,
		  						title = frontmatter.title,
		  						body = html,
		  						slug = fields.slug,
		  						featuredImage = getImage(frontmatter.featured_image);

		  				return (
		  					<Link key={i} to={`/projects${slug}`} className={containerStyles.card}>
		  						<div className={`${containerStyles.card_wrapper} ${generalStyles.margin}`}>
		  							<div className={containerStyles.card_landscape_inner}>
			  							<GatsbyImage style={{objectFit: "cover", position: "unset"}} className={`${containerStyles.card_image} ${mediaStyles.cover}`} image={featuredImage} alt={title}/>
		  							</div>
		  							<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between} ${containerStyles.align_center}`} >
			  							<h4>{title}</h4>
			  							<span>{frontmatter.year_end}</span>
			  						</div>
			  					</div>
		  					</Link>

		  				)

		  			}
		  		) 
			}

		</>

	)


}

export default IndexCards;
