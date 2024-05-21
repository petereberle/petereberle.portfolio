import React from "react"

import {graphql} from "gatsby"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import Layout from "../components/layout"

import { Link } from "@reach/router";

import ProjectNavigation from "../components/project-navigation/project-navigation"

import * as generalStyles from "../components/styles/general.module.css"
import * as containerStyles from "../components/styles/containers.module.css"

const ProjectTemplate = ({ data, pageContext, location}) => {
	
	const 	{markdownRemark} = data,
			{html, frontmatter, title, fields} = markdownRemark,
			featuredImage = getImage(frontmatter.featured_image),
			projectImageData = frontmatter.project_images,
			projectTags = frontmatter.tags;

	const ProjectImages = () => (

		projectImageData ? projectImageData.map( 
			(image, i) =>  (
				image.source !== null ? (
					<div key={i}>	
					<GatsbyImage image={getImage(image.source)} alt={image.caption} />
					<p>{image.caption}</p>
				 	</div>
				 ) : null
			)) : null
		)

	return (

		<Layout path={location}>

				<div className={containerStyles.content_section}>
					<div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between} ${generalStyles.position_sticky}`}>
						<ProjectNavigation projectTags={projectTags} pageContext={pageContext} />
					</div>
					<GatsbyImage image={featuredImage} alt={frontmatter.title} />
					<h1>{frontmatter.title}</h1>
					<div  dangerouslySetInnerHTML={{ __html: html }}/>
					<ProjectImages />
				</div>

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