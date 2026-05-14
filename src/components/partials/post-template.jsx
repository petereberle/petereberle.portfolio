import * as React from "react"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import SEO from "../seo"

import ContentRouterAnimation from "./content-router-animation"

import useMobileWindow from "../hooks/use-mobile-window"

import PostNavigation from "./post-navigation"
import Video from "./video"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as typographyStyles from "../styles/typography.module.css"
import * as mediaStyles from "../styles/media.module.css"

const PostTemplate = ({postData, urlParam, pageContext}) => {
	
	const 	{html, frontmatter, fields} = postData,
			featuredImage = frontmatter.featured_image,
			postImageData = frontmatter.images,
			tags = frontmatter.tags ? frontmatter.tags : null, 
			{title, client, tagline, year, year_start, year_end, materials} = frontmatter,
			postYear = year ? year : year_end && year_start !== year_end ? year_start + ' - ' + year_end : year_start,
			mobileWindow = useMobileWindow();

	const 	FeaturedPostMedia = () => {

			const 	extension = featuredImage.extension,
					videoExtension = extension.includes('mp4') || extension.includes('move'),
					publicUrl = featuredImage.publicURL;

			return !videoExtension ? 

			<GatsbyImage image={getImage(featuredImage)} className={containerStyles.card_image} alt={title}/>

			: videoExtension ? 

			<Video source={publicUrl} title={title} classes={`${mediaStyles.reel} ${containerStyles.card_image}`}/>  

			: null;

	};

	const 	PostMedia = () => {

				return postImageData ? postImageData.map( (data, i) => {

					const 	Vignette = ({children}) => (
								<div className={`${containerStyles.vignette} ${containerStyles.flex_column}`}>
									{children}
								</div>
							),
							source = data.source ? data.source : undefined,
							iframe = data.iframe ? data.iframe : undefined;

					if(!source && !iframe){ return null}

					const 	extension = source?.extension,
							videoExtension = extension?.includes('mp4', 'mov'),
							publicUrl = source?.publicURL,
							caption = data.caption && <p className={typographyStyles.text_center}>{data.caption}</p>;

					const media = source && !videoExtension ? 
						<>
							<GatsbyImage image={getImage(source)} alt={title}/>
							{caption}
						</>
					: source && videoExtension ? 

						<>
							<Video source={publicUrl} title={title} classes={`${mediaStyles.reel}`}/>  
							{caption}
						</>

					: iframe ? 

						<>
							<iframe src={iframe} className={`${mediaStyles.reel}`} frameBorder="0" allow="autoplay;"></iframe>
							{caption}
						</>

					: null;

					return <Vignette key={i}> {media} </Vignette>

				} ) : null;

			}

	return (
		<>

		<SEO pageTitle={title}/>

		<div className={`${containerStyles.content_section}`}>
			<div className={`${containerStyles.grid} ${containerStyles._25_75} ${mobileWindow ? containerStyles.reverse : ''}`}>
				<div className={`${containerStyles.flex_column} ${containerStyles.justify_center}`}>
					<div className={`${containerStyles.sidebar_inner} ${containerStyles.width_subtract_padding}`}>
						{/*<h2 style={{marginTop : 0}}>{title}</h2>*/}
						{tagline ? <h2>{tagline}</h2>  : <h2>{title}</h2>} 
						{client && <h4>Client: {client}</h4>}
						{postYear && <h4>Year: {postYear}</h4>}
						{materials && <h4>Materials: {materials}</h4>}
					</div>
				</div>
				<FeaturedPostMedia/>
			</div>
			<div className={generalStyles.post_html} dangerouslySetInnerHTML={{ __html: html }} />
			<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between}`}>
				<PostNavigation urlParam={urlParam} currentTags={tags} pageContext={pageContext} />
			</div>
			<PostMedia />
		</div>

		</>
	)

}

export default PostTemplate