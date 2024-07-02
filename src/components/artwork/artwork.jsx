import * as React from "react";

import { useStaticQuery, graphql } from "gatsby";

import ContentRouterAnimation from "../partials/content-router-animation"

import * as containerStyles from "../styles/containers.module.css"

import IndexGrid from "../partials/index-grid"
import IndexCards from "../partials/index-card"

const Artwork = ({urlParam}) => {

  const {allMarkdownRemark} = useStaticQuery(graphql`
	    query Artwork {
			  allMarkdownRemark(
			    filter: { fileAbsolutePath: { regex: "/(artwork)/" } }
					sort: { frontmatter: {year: DESC} } 
				) {
			  edges {
			    node {
			      id
			      html
			      frontmatter {
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
			      }
			      fields {
			      	slug
			      }
			    } 
			  }
			}	 
		}`
    )

    return (

    	<ContentRouterAnimation urlParam={urlParam}>

	    	<IndexGrid>

	    		<IndexCards className={containerStyles.index} urlParam={urlParam} article = {allMarkdownRemark.edges} path={null} indexConstraint={allMarkdownRemark.edges.length}/>

	    	</IndexGrid>

    	</ContentRouterAnimation>
    )

}

export default Artwork;