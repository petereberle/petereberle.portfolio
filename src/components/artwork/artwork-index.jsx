import React, {useState} from "react";

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import Video from "../partials/video"
import MenuToggle from "../partials/menu-toggle"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"

const ArtworkIndex = ({artwork}) => {

	const 	[lightbox, setLightbox] = useState(''),
			[lightboxStatus, setLightboxStatus] = useState(false),
			isLightbox = (id) => (lightbox === id ? true : false);

	// useEffect( () => {

	// 	if(lightbox)

	// },[lightbox] )

	return (

		<>	
			<div className={`${containerStyles.lightbox_toggle} ${!lightbox ? generalStyles.hide : ''}`}>
				<MenuToggle isToggled={isLightbox} toggleMenu={setLightbox} initialState={''} visibility={lightbox} />
			</div>

			{ artwork.map( (data, i) => {

		  				const 	{node} = data,
		  						{frontmatter, html, id} = node,
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
		  					<button key={i} className={`${containerStyles.card} ${isLightbox(id) ? containerStyles.lightbox : ''}`} onClick={ () => { setLightbox(id) }}>
		  						<div className={`${containerStyles.card_wrapper} ${generalStyles.margin}`}>
		  							<div className={containerStyles.card_landscape_inner}>
			  							<FeaturedMedia/>
		  							</div>
		  							<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between} ${containerStyles.align_center}`} >
			  							<h4>{title}</h4>
			  							<span>{frontmatter.year}</span>
			  							<div className={isLightbox(id) ? '' : generalStyles.hide}>
			  								<div  dangerouslySetInnerHTML={{ __html: html }} />
			  							</div>
			  						</div>
			  					</div>
		  					</button>

		  				)

		  			}
		  		) 
			}

		</>

	)


}

export default ArtworkIndex
