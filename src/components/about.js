
import * as React from "react";

import { useStaticQuery, graphql } from "gatsby";

const About = () => {

  const {markdownRemark} = useStaticQuery(graphql`
        query {
            markdownRemark(frontmatter: { title: { eq: "About" } }) {
              html
              frontmatter {
                title
              }
            }
          }`

    )

    return (

      <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />

    )


}

export default About;