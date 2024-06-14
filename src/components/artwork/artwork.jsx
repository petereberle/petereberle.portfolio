import * as React from "react";

import { useStaticQuery, graphql } from "gatsby";

import ContentRouterAnimation from "../partials/content-router-animation"

import * as containerStyles from "../styles/containers.module.css"

import ArtworkIndex from "./artwork-index"

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
			        title
			        year
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
			    } 
			  }
			}	 
		}`
    )

    return (

    	<ContentRouterAnimation urlParam={urlParam}>

	    	<div className={`${containerStyles.index}`}>

	    		<ArtworkIndex artwork={allMarkdownRemark.edges} />

	    	</div>

    	</ContentRouterAnimation>
    )

}

export default Artwork;