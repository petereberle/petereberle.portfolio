import React from "react"

import {graphql} from "gatsby"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import { Link } from "@reach/router";

import Layout from "../components/layout"

import ContentRouterAnimation from "../components/partials/content-router-animation"

import useMobileWindow from "../components/partials/mobile-window"

import ProjectNavigation from "../components/project-navigation/project-navigation"

import * as generalStyles from "../components/styles/general.module.css"
import * as containerStyles from "../components/styles/containers.module.css"
import * as typographyStyles from "../components/styles/typography.module.css"

const ProjectTemplate = ({ data, pageContext, location}) => {
	
	const 	{markdownRemark} = data,
			{html, frontmatter, title, fields} = markdownRemark,
			featuredImage = getImage(frontmatter.featured_image),
			projectImageData = frontmatter.project_images,
			projectTags = frontmatter.tags,
			{year_start, year_end} = frontmatter,
			mobileWindow = useMobileWindow();

	const ProjectImages = () => (

		projectImageData ? projectImageData.map( 
			(image, i) =>  (
				image.source !== null ? (
					<div key={i}>
						<div className={containerStyles.vignette}>
							<GatsbyImage image={getImage(image.source)} alt={image.caption} />
						</div>
						<p className={typographyStyles.text_center}>{image.caption}</p>
				 	</div>
				 ) : null
			)) : null
		)

	return (
		<Layout path={location}>

			<ContentRouterAnimation urlParam={location}>
				<div className={`${containerStyles.grid} ${containerStyles._50_50}`}>
					<div className={containerStyles.sidebar}>
						<div className={containerStyles.sidebar_inner}>
							<GatsbyImage image={featuredImage} alt={frontmatter.title} />
							<ProjectImages />
						</div>
					</div>
					<div className={`${containerStyles.grid} ${mobileWindow ? containerStyles.reverse : ''}`}>
						<div className={`${generalStyles.position_sticky} ${containerStyles.sidebar}`}>
							<div className={containerStyles.sidebar_inner}>
								<h1>{frontmatter.title}</h1>
								<span>{year_start !== year_end ? year_start + ' - ' + year_end : year_start}</span>
								<div  dangerouslySetInnerHTML={{ __html: html }} />
								<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between}`}>
									<ProjectNavigation projectTags={projectTags} pageContext={pageContext} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</ContentRouterAnimation>

		</Layout>
	)

}

export const pageQuery = graphql`

	query($slug: String!) {

		markdownRemark( frontmatter: { slug: { eq: $slug } } ) {

			html
			frontmatter{
				slug
				title
				year_start
				year_end
				tags
				featured_image {
	                childImageSharp {
	                  gatsbyImageData(
	                  width: 800
	                  placeholder: BLURRED
	                  formats: AUTO
	                  )
	                }
              	}
              	project_images {
              		source {
              			 childImageSharp {
		                  gatsbyImageData(
		                  width: 800
		                  placeholder: BLURRED
		                  formats: AUTO
		                  )
		                }
              		}
              		caption
              	}

			}
			fields {
				slug
			}
		}
	}

`

export default ProjectTemplate