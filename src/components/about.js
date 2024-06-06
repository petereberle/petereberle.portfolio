import React from "react";

import { useStaticQuery, graphql } from "gatsby";
import {GatsbyImage, getImage} from "gatsby-plugin-image"

import ContentRouterAnimation from "./partials/content-router-animation"

import * as generalStyles from "./styles/general.module.css"
import * as containerStyles from "./styles/containers.module.css"
import * as mediaStyles from "./styles/media.module.css"

const About = ({urlParam}) => {

  const {markdownRemark} = useStaticQuery(graphql`
        query {
            markdownRemark(frontmatter: { title: { eq: "About" } }) {
              html
              frontmatter {
                title
                profile {
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
          }`

    ),
    profileImage = getImage(markdownRemark.frontmatter.profile),
    title = markdownRemark.frontmatter.title;

    return (

      <ContentRouterAnimation urlParam={urlParam}>
        <div className={generalStyles.profile_wrapper}>
          <GatsbyImage style={{position: "relative"}} className={`${generalStyles.profile} ${generalStyles.ellipse_clip}`} image={profileImage} alt={title} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: markdownRemark.html }} />
      </ContentRouterAnimation>
    )


}

export default About;