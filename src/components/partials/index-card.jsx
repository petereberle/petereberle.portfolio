import * as React from "react";

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import {AnimatePresence} from "framer-motion"

import Card from "../partials/card-elem"
import Video from "../partials/video"

import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"

const IndexCards = ({urlParam, article, path, indexConstraint}) => {

	const 	directory = path ? path : urlParam.pathname.replace(/\//g, '');

	return (

		<AnimatePresence>

			{ article.map( (data, i) => {

		  				const 	{node} = data,
		  						{frontmatter, fields} = node,
		  						title = frontmatter.title,
		  						slug = fields.slug,
		  						extension = frontmatter.featured_image.extension,
		  						videoExtension = extension.includes('mp4') || extension.includes('mov'),
		  						publicUrl = frontmatter.featured_image.publicURL,
		  						featuredMedia = !videoExtension ?
		  							<GatsbyImage className={`${containerStyles.card_image} ${mediaStyles.cover}`} image={getImage(frontmatter.featured_image)} alt={title}/>
		  						: videoExtension ?
		  							<Video source={publicUrl} title={title} classes={`${containerStyles.card_image} ${mediaStyles.cover} ${mediaStyles.reel}`}/>
		  						: null;
		  				
		  				return i < indexConstraint ? (

		  					<Card link={directory + slug} key={slug}>

	  							<div className={containerStyles.card_landscape_inner}>
		  							{featuredMedia}
	  							</div>
	  							<div className={`${containerStyles.flex_row} ${containerStyles.justify_start} ${containerStyles.align_center}`} >
		  							<h4>{title}</h4>
		  						</div>

		  					</Card>

		  				) : null

		  			}
		  		) 
			}

		</AnimatePresence>

	)


}

export default IndexCards;
