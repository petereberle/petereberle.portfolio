import React, {useState} from "react"
import { graphql } from "gatsby"
import {GatsbyImage, getImage} from "gatsby-plugin-image"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"

import useMobileWindow from "../components/hooks/use-mobile-window"

import ContentRouterAnimation from "../components/partials/content-router-animation"

import "normalize.css"
import * as generalStyles from "../components/styles/general.module.css"
import * as containerStyles from "../components/styles/containers.module.css"
import "../components/styles/typography.module.css"
import * as styles from "../components/styles/resume.module.css"

const ResumeTemplate = ({ data, pageContext, location}) => {

  const mobileWindow = useMobileWindow();

  const { html, frontmatter } = data.markdownRemark
  const contactDetails = [
    frontmatter.location,
    frontmatter.website,
    frontmatter.phone,
    frontmatter.email,
  ].filter(Boolean);
  const qrCode = frontmatter.qr_code;

  const [printMode, setPrintMode] = useState(false);

  const printPage = () => {

    setPrintMode(true);

    setTimeout( () => {

        window.print();
        setPrintMode(false);

      }, 500);

  };

  return (
    <Layout
      path={location}
      pageClassName={styles.resumePage}
      mainClassName={styles.resumeMain}
    >

      <ContentRouterAnimation urlParam={location}>

        <Helmet> 

          <title>{`${frontmatter.title} | Resume`}</title>

          <style type="text/css">

              { printMode ? `

              #___gatsby{
                border-radius: 0;
                border: unset;
                margin: 0;
                padding: 0;
                height: 100vh;
                width: 100vw;
              }

              :root{
                --resume-font-basis: 10pt;
                --print-visibility: block;
                --print-visibility-hide: none;
                --head-space: 0;
              }

              ` :`
              :root{

              }`
            }

          </style>
          
        </Helmet>

        <div className={`${containerStyles.grid} ${containerStyles._25_75} ${styles.resumeLayout}`}>

          <aside className={`${containerStyles.flex_column} ${generalStyles.margin_negative} ${styles.printControls}`}>
            <div className={`${mobileWindow ? generalStyles.position_relative + ' ' + containerStyles.flex_row : generalStyles.position_sticky  + ' ' + containerStyles.flex_column } `}>
              <button className={`${generalStyles.tag} ${styles.controls}`} type="button" onClick={() => printPage()}>
                Print / Save
              </button>
            </div>
          </aside>
          <main className={styles.document}>
            <header className={styles.header}>
            
                <div className={`${containerStyles.flex_column}`}>

                  <h4 className={styles.name}>{frontmatter.title}</h4>

                  <ul className={styles.contact}>
                    {contactDetails.length > 0 ? contactDetails.map( (c) => {
                      return <li key={c}><h4>{c}</h4></li>
                    }) : '' }
                  </ul>

                </div>

                { qrCode ? <GatsbyImage className={styles.qrCode} image={getImage(frontmatter.qr_code)} alt="website-qr-code"/> : ''}

            </header>
            <article
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </main>

        </div>

      </ContentRouterAnimation>

    </Layout>
  )
}

export const pageQuery = graphql`
  query ResumePage($slug: String!) {
    markdownRemark(frontmatter: { type: { eq: "resume" }, slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        headline
        location
        website
        phone
        email
        qr_code {
          extension
          publicURL
          childImageSharp {
            gatsbyImageData(
            width: 200
            height: 200
            placeholder: BLURRED
            formats: AUTO
            )
          }
        }
      }
    }
  }
`

export default ResumeTemplate
