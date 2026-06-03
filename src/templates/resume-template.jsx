import React, {useState} from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Layout from "../components/layout"

import ContentRouterAnimation from "../components/partials/content-router-animation"

import "normalize.css"
import * as generalStyles from "../components/styles/general.module.css"
import "../components/styles/typography.module.css"
import * as styles from "../components/styles/resume.module.css"

const ResumeTemplate = ({ data, pageContext, location}) => {

  const { html, frontmatter } = data.markdownRemark
  const contactDetails = [
    frontmatter.location,
    frontmatter.phone,
    frontmatter.email,
    frontmatter.website,
  ].filter(Boolean)

  const [printMode, setPrintMode] = useState(false);

  const printPage = () => {

    setPrintMode(true);

    setTimeout( () => {

        window.print();
        setPrintMode(false);

      }, 500);

  };

  return (
    <Layout path={location}>

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
              --print-visibility: none;
              --head-space: 0;
            }

            ` :`
            :root{
              --head-space: 0;
            }`
          }

          </style>

        </Helmet>

        <aside className={`${generalStyles.tag} ${styles.controls}`}>
          <button type="button" onClick={() => printPage()}>
            Print / Save
          </button>
        </aside>
        <main className={styles.document}>
          <header className={styles.header}>
          
            <div>
              <h1 className={styles.name}>{frontmatter.title}</h1>
              {frontmatter.headline && <p className={styles.headline}>{frontmatter.headline}</p>}
            </div>

            <ul className={styles.contact}>
              {contactDetails.length > 0 ? contactDetails.map( (c) => {
                return <li>{c}</li>
              }) : '' }
            </ul>
          </header>
          <article
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </main>

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
        phone
        email
        website
      }
    }
  }
`

export default ResumeTemplate
