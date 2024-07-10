import * as React from "react";

import { useStaticQuery, graphql } from "gatsby";

import {GatsbyImage, getImage} from "gatsby-plugin-image"

import SEO from "./seo"

import ContentRouterAnimation from "./partials/content-router-animation"

import IndexCards from "./partials/index-card"
import Card from "./partials/card-elem"

import * as generalStyles from "./styles/general.module.css"
import * as typographyStyles from "./styles/typography.module.css"
import * as containerStyles from "./styles/containers.module.css"

const About = ({urlParam}) => {

  const {SiteQuery, about, featuredProjects, featuredArtwork} = useStaticQuery(graphql`
       
        query { 

          SiteQuery :
             site {
              siteMetadata {
                description
              }
            }

          about:
            markdownRemark(frontmatter: { type: { eq: "about" } }) {
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

          featuredProjects:
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

          featuredArtwork:
            allMarkdownRemark(
              filter: { fileAbsolutePath: { regex: "/(artwork)/" } }
              sort: { frontmatter: {year_end: DESC} } 
            ) {
            edges {
              node {
                id
                html
                frontmatter {
                  slug
                  title
                  year
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

    ),
    siteDescription = SiteQuery.siteMetadata.description,
    profileImage = getImage(about.frontmatter.profile),
    title = about.frontmatter.title

    return (

      <>

      <SEO/>

      <ContentRouterAnimation urlParam={urlParam}>

        <div className={`${containerStyles.grid} ${containerStyles._6_col_auto_row}`}>

          <div className={`${containerStyles.flex_column} ${containerStyles.grid_item} ${generalStyles.profile_card}  ${containerStyles.align_center}`}>
              <div className={`${generalStyles.profile_wrapper}`}>
                <GatsbyImage style={{position: "relative"}} className={`${generalStyles.profile} ${generalStyles.ellipse_clip}`} image={profileImage} alt={title} />
              </div>
              <h1 className={`${containerStyles.grid_item} ${typographyStyles.text_center}`} >{title}</h1>

            <p>{siteDescription}</p>
          </div>

            <IndexCards urlParam={urlParam} article={featuredProjects.edges} path={"projects"} indexConstraint={2} />

            <Card className={generalStyles.theme_background_primary} link='projects'>
              <div className={`${generalStyles.item} ${generalStyles.active}`}>
                All Projects
              </div>
            </Card>

            <IndexCards urlParam={urlParam} article={featuredArtwork.edges} path={"artwork"} indexConstraint={2} />

            <Card className={generalStyles.theme_background_primary} link='artwork'>
              <div className={`${generalStyles.item} ${generalStyles.active}`}>
                All Artwork
              </div>
            </Card>

        </div>

      </ContentRouterAnimation>

      </>
    )


}

export default About;