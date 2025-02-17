import * as React from "react";

import {Link} from "gatsby"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import {AnimatePresence, motion} from "framer-motion"

import Card from "../partials/card-elem"
import Video from "../partials/video"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"

const IndexCards = ({urlParam, article, path, indexConstraint}) => {

	const 	directory = path ? path : urlParam.pathname.replace(/\//g, '');

	return (

		<AnimatePresence>

			{ article.map( (data, i) => {

		  				const 	{node} = data,
		  						{frontmatter, html, fields} = node,
		  						title = frontmatter.title,
		  						body = html,
		  						slug = fields.slug,
		  						year = frontmatter.year_end || frontmatter.year,
		  						FeaturedMedia = () => { 

		  							const 	extension = frontmatter.featured_image.extension,
		  									videoExtension = extension.includes('mp4') || extension.includes('mov'),
		  									publicUrl = frontmatter.featured_image.publicURL;

		  							return !videoExtension ? 

		  								<GatsbyImage className={`${containerStyles.card_image} ${mediaStyles.cover}`} image={getImage(frontmatter.featured_image)} alt={title}/>

		  							: videoExtension ? 

		  							<Video source={publicUrl} title={title} classes={`${containerStyles.card_image} ${mediaStyles.cover} ${mediaStyles.reel}`}/>  

		  							: null;
		  						};
		  				
		  				return i < indexConstraint ? (

		  					<Card link={directory + slug} key={i}>

	  							<div className={containerStyles.card_landscape_inner}>
		  							<FeaturedMedia/>
	  							</div>
	  							<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between} ${containerStyles.align_center}`} >
		  							<h4>{title}</h4>
		  							<span>{year}</span>
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
