import * as React from "react"

import {useStaticQuery, graphql} from "gatsby"

const useResumeFile = () => {
	
	const {allFile} = useStaticQuery(graphql`

		query Resume {
		  allFile(filter: { sourceInstanceName: { eq: "resume-file" } }) {
		    edges {
		      node {
		        publicURL
		        extension
		        birthTime
		      }
		    }
		  }
		}

	`)

	return allFile

}

export default useResumeFile