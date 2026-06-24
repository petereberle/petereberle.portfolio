import * as React from "react";

import {AnimatePresence} from "framer-motion"

import Card from "../partials/card-elem"
import FeaturedMedia from "./featured-media"

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
		  						slug = fields.slug;
		  				
		  				return i < indexConstraint ? (

		  					<Card link={directory + slug} key={slug}>

	  							<FeaturedMedia
	  								media={frontmatter.featured_media}
	  								fallbackMedia={frontmatter.featured_image}
	  								title={title}
	  								imageClassName={`${containerStyles.card_image} ${mediaStyles.cover}`}
	  								enableCarousel={false}
	  								showControls={false}
	  							/>
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
