const productionSiteUrl = require("./productionSiteUrl")
const siteMetadata = require("./siteMetadata")
const siteTitle = require("./siteTitle")

module.exports = {
  siteMetadata,
  flags: {
    DEV_SSR: true
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
        resolve: `gatsby-transformer-remark`,
        options: {
          plugins: [
          {
            resolve: "gatsby-remark-external-links",
            options: {
              target: "_blank",
              rel: "noreferrer"
            }
          }
          ]
        }
      },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/../content/images/resources`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects-images`,
        path: `${__dirname}/../content/images/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `artwork-images`,
        path: `${__dirname}/../content/images/artwork`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `social-markdown`,
        path: `${__dirname}/../content/social`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about-markdown`,
        path: `${__dirname}/../content/about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contact-markdown`,
        path: `${__dirname}/../content/contact`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects-markdown`,
        path: `${__dirname}/../content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `artwork-markdown`,
        path: `${__dirname}/../content/artwork`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resume-file`,
        path: `${__dirname}/../content/resume`,
      },
    },
    {
      resolve: `gatsby-plugin-gtag`,
      options: {
        // your google analytics tracking id
        trackingId: `G-TYE0DDL73W`,
        // Puts tracking script in the head instead of the body
        head: true,
        // enable ip anonymization
        anonymize: false,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: siteTitle.full,
        short_name: siteTitle.short,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#FBAD18`,
        display: `minimal-ui`,
        icon: `config/icons/icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}