import React, {useState, useEffect} from "react";

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import Video from "../partials/video"
import MenuToggle from "../partials/menu-toggle"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as mediaStyles from "../styles/media.module.css"
import * as typographyStyles from "../styles/typography.module.css"

const ArtworkIndex = ({artwork}) => {

	const 	[lightbox, setLightbox] = useState(false),
			[lightboxStatus, setLightboxStatus] = useState(false),
			isLightbox = (id) => (lightbox === id ? true : false);

	useEffect( ()=>{

		const windowGlobal = typeof window !== 'undefined';

		if( lightbox ) { 

			setLightboxStatus(true)

			if(!windowGlobal) return

			window.scrollTo(0,0)

		} 
		else if ( !lightbox ) { setLightboxStatus(false) }

	},[lightbox])

	return (

		<>	
			<div className={`${containerStyles.lightbox_toggle} ${!lightbox ? generalStyles.hide : ''}`}>
				<MenuToggle isToggled={isLightbox} toggleMenu={setLightbox} initialState={false} visibility={lightbox} />
			</div>

			{ artwork.map( (data, i) => {

		  				const 	{node} = data,
		  						{frontmatter, html, id} = node,
		  						title = frontmatter.title,
		  						materials = frontmatter.materials,
		  						description = html,
		  						FeaturedMedia = ({id}) => { 

		  							const 	videoExtension = frontmatter.featured_image.extension.includes('mp4', 'mov'),
		  									publicUrl = frontmatter.featured_image.publicURL;

		  							return !videoExtension ? 

		  								<GatsbyImage className={`${isLightbox(id) ? containerStyles.lightbox : ''} ${containerStyles.card_image} ${mediaStyles.cover}`} image={getImage(frontmatter.featured_image)} alt={title}/>

		  							: videoExtension ? 

		  							<Video source={publicUrl} title={title} classes={`${isLightbox(id) ? containerStyles.lightbox : ''} ${containerStyles.card_image} ${mediaStyles.cover} ${mediaStyles.reel}`}/>  

		  							: null;
		  						},
		  						ArtworkMedia = () => {

		  							return frontmatter.artwork_images?.map( (data, i) => {

		  								const 	source = data.source ? data.source : undefined,
		  										iframe = data.iframe ? data.iframe : undefined;

		  								if(!source && !iframe){ return null}

		  								const 	videoExtension = source?.extension.includes('mp4', 'mov'),
			  									publicUrl = source?.publicURL,
			  									caption = data.caption && <p className={typographyStyles.text_center}>{data.caption}</p>;

			  							return source && !videoExtension ? 
			  								<div key={i}>
			  								<GatsbyImage className={`${isLightbox(id) ? containerStyles.lightbox : ''} ${containerStyles.card_image} ${mediaStyles.cover}`} image={getImage(source)} alt={title}/>
			  								{caption}
			  								</div>
			  							: source && videoExtension ? 

			  							<div key={i}>
			  							<Video source={publicUrl} title={title} classes={`${isLightbox(id) ? containerStyles.lightbox : ''} ${containerStyles.card_image} ${mediaStyles.cover} ${mediaStyles.reel}`}/>  
			  							{caption}
			  							</div>

			  							: iframe ? 

			  							<div key={i}>
			  							<iframe src={iframe} className={`${isLightbox(id) ? containerStyles.lightbox : ''} ${containerStyles.card_image} ${mediaStyles.cover} ${mediaStyles.reel}`} frameBorder="0" allow="autoplay;"></iframe>
			  							{caption}
			  							</div>

			  							: null;


		  							} )

		  						}

		  				return (
		  					<article role="button" key={i} className={`${containerStyles.card} ${isLightbox(id) ? containerStyles.lightbox : lightboxStatus ? generalStyles.no_pointer_events : ''}`} onClick={ () => { setLightbox(id) }}>
		  						<div className={`${containerStyles.lightbox_background} ${isLightbox(id) ? containerStyles.lightbox : ''}`} />
		  						<div className={`${containerStyles.card_wrapper} ${generalStyles.margin} ${isLightbox(id) ? containerStyles.lightbox : ''}`}>
		  							<div className={`${containerStyles.card_landscape_inner} ${isLightbox(id) ? containerStyles.lightbox : ''}`}>
			  							<FeaturedMedia id={id}/>
		  							</div>
		  							<div className={`${isLightbox(id) ? containerStyles.flex_column : containerStyles.flex_row} ${containerStyles.justify_space_between} ${containerStyles.align_center}`} >
			  							{isLightbox(id) ? <h3>{title}</h3> : <h4>{title}</h4> }
			  							<span>{frontmatter.year}</span>
			  							<div className={isLightbox(id) ? '' : generalStyles.hide}>
			  								{materials && <p>Materials: {materials}</p>}
			  								<ArtworkMedia />
			  							</div>
			  						</div>
			  					</div>
		  					</article>

		  				)

		  			}
		  		) 
			}

		</>

	)


}

export default ArtworkIndex
