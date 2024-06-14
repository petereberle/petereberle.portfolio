import React from "react";

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import Video from "../partials/video"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"

const ArtworkIndex = ({artwork}) => {


	return (

		<>

			{ artwork.map( (data, i) => {

		  				const 	{node} = data,
		  						{frontmatter, html} = node,
		  						title = frontmatter.title,
		  						description = html,
		  						FeaturedMedia = () => { 

		  							const 	videoExtension = frontmatter.featured_image.extension.includes('mp4', 'mov'),
		  									publicUrl = frontmatter.featured_image.publicURL;

		  							return !videoExtension ? 

		  								<GatsbyImage style={{objectFit: "cover", position: "unset"}} className={`${containerStyles.card_image} ${mediaStyles.cover}`} image={getImage(frontmatter.featured_image)} alt={title}/>

		  							: videoExtension ? 

		  							<Video source={publicUrl} title={title} classes={`${mediaStyles.cover} ${mediaStyles.reel}`}/>  

		  							: null;
		  						}

		  				return (
		  					<div key={i} className={containerStyles.card}>
		  						<div className={`${containerStyles.card_wrapper} ${generalStyles.margin}`}>
		  							<div className={containerStyles.card_landscape_inner}>
			  							<FeaturedMedia/>
		  							</div>
		  							<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between} ${containerStyles.align_center}`} >
			  							<h4>{title}</h4>
			  							<span>{frontmatter.year}</span>
			  						</div>
			  					</div>
		  					</div>

		  				)

		  			}
		  		) 
			}

		</>

	)


}

export default ArtworkIndex
