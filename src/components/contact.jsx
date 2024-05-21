import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import * as containerStyles from "./styles/containers.module.css";

const Contact = () => {

  const {markdownRemark} = useStaticQuery(graphql`
        query {
            markdownRemark(frontmatter: { title: { eq: "Contact" } }) {
              frontmatter {
                message
                email
              }
            }
          }`

    )

    return (

      <div className={containerStyles.content_section}>
        <div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between}`}>
          <div>
              <p>{markdownRemark.frontmatter.message}</p>
          </div>
          <div>
            <p>{markdownRemark.frontmatter.email}</p>
          </div>
        </div> 
      </div>

    )


}

export default Contact;