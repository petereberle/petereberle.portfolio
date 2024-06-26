import React from "react"

import {graphql} from "gatsby"

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import Layout from "../components/layout"

import ContentRouterAnimation from "../components/partials/content-router-animation"

import PostTemplate from "../components/partials/post-template"

const ProjectTemplate = ({ data, pageContext, location}) => {

	const {markdownRemark} = data;

	return (
		<Layout path={location}>

			<ContentRouterAnimation urlParam={location}>
				<PostTemplate postData={markdownRemark} urlParam={location} pageContext={pageContext}/>
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
					extension
					publicURL
	                childImageSharp {
	                  gatsbyImageData(
	                  width: 800
	                  placeholder: BLURRED
	                  formats: AUTO
	                  )
	                }
              	}
              	images {
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