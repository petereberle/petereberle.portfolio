import * as React from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import "normalize.css"
import * as generalStyles from "../components/styles/general.module.css"
import "../components/styles/typography.module.css"
import * as styles from "../components/styles/resume.module.css"

const ResumeTemplate = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark
  const contactDetails = [
    frontmatter.location,
    frontmatter.phone,
    frontmatter.email,
    frontmatter.website,
  ].filter(Boolean)

  return (
    <>
      <Helmet title={`${frontmatter.title} | Resume`} />
      <aside className={`${generalStyles.tag} ${styles.controls}`}>
        <button type="button" onClick={() => window.print()}>
          Print / Save
        </button>
      </aside>
      <main className={styles.document}>
        <header className={styles.header}>
          <h1 className={styles.name}>{frontmatter.title}</h1>
          {frontmatter.headline && <p className={styles.headline}>{frontmatter.headline}</p>}
          {contactDetails.length > 0 && (
            <p className={styles.contact}>{contactDetails.join(" | ")}</p>
          )}
        </header>
        <article
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </main>
    </>
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
