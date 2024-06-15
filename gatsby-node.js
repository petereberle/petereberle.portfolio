/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

/**
 * @type {import('gatsby').GatsbyNode['createPages']}
 */

const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ actions, graphql, reporter }) => {

  const projectTemplate = require.resolve('./src/templates/project-template.jsx')

  const {data} = await graphql(`
    {
        projectsRemark: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(projects)/" } }
          sort: { frontmatter: {year_end: DESC} } 
        ) {
        edges {
          node {
            frontmatter {
              slug
              title
              tags
            }
            fields {
              slug
            }
          } 
        }
      }  
    }
  `)

  if (data.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const projects = data.projectsRemark.edges,
        getTags = () => {

          const tagsArr = ['all'];

          data.projectsRemark.edges.map((project) => ( 

              project.node.frontmatter.tags.map(

                  (t) => tagsArr.push(t) 

                ) 

            )) 

        return [...new Set(tagsArr)] 

        }

  projects.forEach(({node}, pageIndex) => {
    const slug = node.fields.slug
    actions.createPage({
      path: `/projects${node.fields.slug}`,
      component: projectTemplate,
      context: { 
        slug: node.frontmatter.slug,
        title: node.frontmatter.title,
        tags: getTags(),
        next: pageIndex === projects.length - 1 ? null : projects[pageIndex + 1].node,
        prev: pageIndex === 0 ? null : projects[pageIndex - 1].node
      },
    })
  })
}

// exports.createSchemaCustomization = ({ actions }) => {
//   const { createTypes } = actions
//   const typeDefs = `
//     type MarkdownRemark implements Node {
//       frontmatter: Frontmatter
//     }
//     type Frontmatter {
//       featured_image: File! 
//     }

//     type File {
//       extension: String!
//       publicURL: String!
//       childImageSharp: ImageSharp
//     }
//   `
//   createTypes(typeDefs)
// }

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
      MarkdownRemarkFrontmatter: {
          isDraft: {
            type: 'Boolean',
            resolve: ({ isDraft }) => isDraft || false,
          },
        },
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    actions.createNodeField({
      name: `slug`,
      node,
      value,
    })

  }
}


exports.onCreatePage = ({ page, actions }) => {
  if (page.path === `/`) {
    page.matchPath = `/*`
    actions.createPage(page)
  }
}