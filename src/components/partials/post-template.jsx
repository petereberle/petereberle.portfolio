import * as React from "react"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import SEO from "../seo"

import ContentRouterAnimation from "./content-router-animation"

// import useMobileWindow from "../hooks/use-mobile-window"

import PostNavigation from "./post-navigation"
import Video from "./video"
import FeaturedMedia from "./featured-media"

import * as generalStyles from "../styles/general.module.css"
import * as containerStyles from "../styles/containers.module.css"
import * as typographyStyles from "../styles/typography.module.css"
import * as mediaStyles from "../styles/media.module.css"

const PostTemplate = ({postData, urlParam, pageContext}) => {
	
	const 	{html, frontmatter, fields} = postData,
			featuredImage = frontmatter.featured_image,
			featuredMedia = frontmatter.featured_media,
			postImageData = frontmatter.images,
			tags = frontmatter.tags ? frontmatter.tags : null, 
			{title, client, tagline, year, year_start, year_end, materials} = frontmatter,
			postYear = year ? year : year_end && year_start !== year_end ? year_start + ' - ' + year_end : year_start;
			// mobileWindow = useMobileWindow();

	const 	FeaturedPostMedia = () => (
				<div className={`${containerStyles.card}`}>
					<FeaturedMedia media={featuredMedia} fallbackMedia={featuredImage} title={title}/>
				</div>
			);

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
							<GatsbyImage className={`${containerStyles.card_image} ${mediaStyles.contain}`} image={getImage(source)} alt={title}/>
						</>
					: source && videoExtension ? 

						<>
							<Video source={publicUrl} title={title} classes={`${mediaStyles.reel} ${containerStyles.card_image} ${mediaStyles.contain}`}/>  
						</>

					: iframe ? 

						<>
							<iframe src={iframe} className={`${mediaStyles.reel} ${containerStyles.card_image} ${mediaStyles.contain}`} frameBorder="0" allow="autoplay;"></iframe>
						</>

					: null;

					return (
					  <Vignette key={i}>
					    <div className={containerStyles.card_landscape_inner}>
					        {media}
					    </div>
					    	{caption}
					  </Vignette>
					)


				} ) : null;

			}

	return (
		<>

		<SEO pageTitle={title}/>

		<div className={`${containerStyles.content_section}`}>
			<div className={`${containerStyles.grid} ${containerStyles._25_75}`}>
				<div className={`${containerStyles.flex_column} ${containerStyles.justify_start}`}>
					<div className={`${generalStyles.position_sticky}`}>
						{tagline ? <h1 className={generalStyles._0_margin} >{tagline}</h1>  : <h1 className={generalStyles._0_margin} >{title}</h1>} 
						{client && <h4>Client: {client}</h4>}
						{postYear && <h4>Year: {postYear}</h4>}
						{materials && <h4>Materials: {materials}</h4>}
					</div>
				</div>
				<div className={`${containerStyles.flex_column} ${containerStyles.flex_gap_2}`}>
					<FeaturedPostMedia/>
					<div className={generalStyles.post_html} dangerouslySetInnerHTML={{ __html: html }} />
					<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between}`}>
						<PostNavigation urlParam={urlParam} currentTags={tags} pageContext={pageContext} />
					</div>
					<PostMedia />
				</div>
			</div>
		</div>

		</>
	)

}

export default PostTemplate
