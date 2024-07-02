import * as React from "react"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import ContentRouterAnimation from "./content-router-animation"

import useMobileWindow from "./mobile-window"
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
			{title, year, year_start, year_end, materials} = frontmatter,
			postYear = year ? year : year_end && year_start !== year_end ? year_start + ' - ' + year_end : year_start,
			mobileWindow = useMobileWindow();

	const 	FeaturedPostMedia = () => {

			const 	extension = featuredImage.extension,
					videoExtension = extension.includes('mp4') || extension.includes('move'),
					publicUrl = featuredImage.publicURL;

			return !videoExtension ? 

				<GatsbyImage image={getImage(featuredImage)} alt={title}/>

			: videoExtension ? 

			<Video source={publicUrl} title={title} classes={`${mediaStyles.reel}`}/>  

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
		<div className={`${containerStyles.grid} ${containerStyles._50_50}`}>
			<div className={containerStyles.sidebar}>
				<div className={containerStyles.sidebar_inner}>
					<FeaturedPostMedia/>
					<PostMedia />
				</div>
			</div>
			<div className={`${containerStyles.grid} ${mobileWindow ? containerStyles.reverse : ''}`}>
				<div className={`${generalStyles.position_sticky} ${containerStyles.sidebar}`}>
					<div className={`${containerStyles.sidebar_inner}`}>
						<h1>{title}</h1>
						<p>{postYear}</p>
						{materials && <p>{materials}</p>}
						<div className={generalStyles.post_html} dangerouslySetInnerHTML={{ __html: html }} />
						<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between}`}>
							<PostNavigation urlParam={urlParam} currentTags={tags} pageContext={pageContext} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}

export default PostTemplate