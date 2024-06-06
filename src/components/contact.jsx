import React from "react";

import { useStaticQuery, graphql } from "gatsby";

import ContentRouterAnimation from "./partials/content-router-animation"

import * as containerStyles from "./styles/containers.module.css";

const Contact = ({urlParam}) => {

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

      <ContentRouterAnimation urlParam={urlParam}>
        <div className={`${containerStyles.flex_row} ${containerStyles.justify_space_between}`}>
          <div>
              <p>{markdownRemark.frontmatter.message}</p>
          </div>
          <div>
            <p>{markdownRemark.frontmatter.email}</p>
          </div>
        </div> 
      </ContentRouterAnimation>

    )


}

export default Contact;