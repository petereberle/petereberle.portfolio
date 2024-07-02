import * as React from "react";

import {Link} from "gatsby"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import {AnimatePresence, motion} from "framer-motion"

import Video from "../partials/video"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"

const	MotionLink = motion(Link);

const IndexCards = ({urlParam, article, year_var}) => {

	const 	path = urlParam.pathname.replace(/\//g, '');

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
		  				
		  				return (

			  					<MotionLink 
			  						layout
							        initial={{ transform: "scale(0)" }}
							        animate={{ transform: "scale(1)" }}
							        exit={{ transform: "scale(0)" }}
							        transition={{
								        type: "spring",
								        mass: 0.35,
								        stiffness: 75,
								        duration: 0.3,
							      	}}
									key={i} to={`/${path + slug}`} className={containerStyles.card}>
			  						<div className={`${containerStyles.card_wrapper} ${generalStyles.margin}`}>
			  							<div className={containerStyles.card_landscape_inner}>
				  							<FeaturedMedia/>
			  							</div>
			  							<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between} ${containerStyles.align_center}`} >
				  							<h4>{title}</h4>
				  							<span>{year}</span>
				  						</div>
				  					</div>
			  					</MotionLink>

		  				)

		  			}
		  		) 
			}

		</AnimatePresence>

	)


}

export default IndexCards;
