import React from "react"
import Helmet from "react-helmet"
import PropTypes from "prop-types"

import { useSiteMetadata } from "./hooks/use-site-metadata"

function SEO({ pageTitle, description, pathname, meta, children }) {

  const { title: defaultTitle, description: defaultDescription, image, author, siteUrl, lang } = useSiteMetadata()

  const seo = {
    title: defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image}`,
    author: author,
    url: `${siteUrl}${pathname || ``}`,
    lang: lang
  }

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={seo.title}
      titleTemplate={`${ pageTitle ? pageTitle + ' | ' : ''}%s`}
      meta={[
        {
          name: `description`,
          content: seo.description,
        },
        {
          property: `og:title`,
          content: seo.title,
        },
        {
          property: `og:description`,
          content: seo.description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: `${seo.url}twitter-card.jpg`,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: `${seo.url}twitter-card.jpg`,
        },
        {
          name: `twitter:creator`,
          content: seo.author,
        },
        {
          name: `twitter:title`,
          content: seo.title,
        },
        {
          name: `twitter:description`,
          content: seo.description,
        },
      ].concat(meta)}
    />
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO