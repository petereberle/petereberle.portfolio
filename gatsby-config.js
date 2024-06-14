/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Peter Eberle`,
    description: ``,
    author: `Peter Eberle`,
    siteUrl: `localhost:8000`,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-remark`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `resources`,
        path: `${__dirname}/content/images/resources`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects-images`,
        path: `${__dirname}/content/images/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `artwork-images`,
        path: `${__dirname}/content/images/artwork`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `about-markdown`,
        path: `${__dirname}/content/about`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `contact-markdown`,
        path: `${__dirname}/content/contact`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects-markdown`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `artwork-markdown`,
        path: `${__dirname}/content/artwork`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
}
