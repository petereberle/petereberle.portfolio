import * as React from "react";

import { useStaticQuery, graphql } from "gatsby";

import ContentRouterAnimation from "../partials/content-router-animation"

import ProjectIndex from "./project-index/project-index"

const Projects = ({urlParam}) => {

  const {allMarkdownRemark} = useStaticQuery(graphql`
	    query Projects {
			  allMarkdownRemark(
			    filter: { fileAbsolutePath: { regex: "/(projects)/" } }
					sort: { frontmatter: {year_end: DESC} } 
				) {
			  edges {
			    node {
			      id
			      html
			      frontmatter {
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

    		<ProjectIndex data = {allMarkdownRemark.edges} urlParam={urlParam}/>

    	</ContentRouterAnimation>
    )

}

export default Projects;