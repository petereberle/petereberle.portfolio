import * as React from "react"

import {graphql} from "gatsby"

import Layout from "../components/layout"

import ContentRouterAnimation from "../components/partials/content-router-animation"

import PostTemplate from "../components/partials/post-template"

const ArtworkTemplate = ({ data, pageContext, location}) => {

	const {markdownRemark} = data;

	return (
		<Layout path={location}>

			<ContentRouterAnimation urlParam={location}>
				<PostTemplate postData={markdownRemark} urlParam={location} pageContext={pageContext} /> 
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
				year
				materials
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
	              	iframe
	              	caption
             	}
			}
			fields {
				slug
			}
		}
	}

`

export default ArtworkTemplate