import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import ProjectIndex from "./project-index/project-index"

const Projects = () => {

  const {allMarkdownRemark} = useStaticQuery(graphql`
	        query Projects {
			  allMarkdownRemark(
			    filter: { fileAbsolutePath: { regex: "/(projects)/" } }
					sort: { frontmatter: {year_end: DESC} } 
				) {
			  edges {
			    node {
			      id
			      excerpt
			      frontmatter {
			        slug
			        title
			        year_start
			        year_end
			      }
			    } 
			  }
			}	 
		}`
    ),
  	PassProjects = () => (

  		allMarkdownRemark.edges.map( (props, index) => {

  				return (

  					<ProjectIndex key={index} {...props} />
  					
  				)
  			}
  		)

  	)


    return (
    	<PassProjects/>
    )

}

export default Projects;