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

  const artworkTemplate = require.resolve('./src/templates/artwork-template.jsx')

  const resumeTemplate = require.resolve('./src/templates/resume-template.jsx')

  const projectsData = await graphql(`
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

  const artworkData = await graphql(`
    {
        artworkRemark: allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/(artwork)/" } }
          sort: { frontmatter: {year: DESC} } 
        ) {
        edges {
          node {
            frontmatter {
              slug
              title
            }
            fields {
              slug
            }
          } 
        }
      }  
    }
  `)

  const resumeData = await graphql(`
    {
      resumes: allMarkdownRemark(
        filter: { frontmatter: { type: { eq: "resume" } } }
      ) {
        edges {
          node {
            frontmatter {
              active
              slug
              title
            }
          }
        }
      }
    }
  `)

  if (projectsData.errors || artworkData.errors || resumeData.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const projects = projectsData.data.projectsRemark.edges,
        artwork = artworkData.data.artworkRemark.edges,
        resumes = resumeData.data.resumes.edges,
        tagsArr = ['All'],
        getTags = () => {

          projects.map((project) => ( 

              project.node.frontmatter.tags.map(

                  (t) => tagsArr.push(t) 

                ) 

            )) 

        return [...new Set(tagsArr)] 

        }

  const activeResumes = resumes.filter(({ node }) => node.frontmatter.active)

  if (activeResumes.length > 1) {
    reporter.panicOnBuild(`Only one resume can have active: true in content/resume.`)
    return
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

  artwork.forEach(({node}, pageIndex) => {
    const slug = node.fields.slug
    actions.createPage({
      path: `/artwork${node.fields.slug}`,
      component: artworkTemplate,
      context: { 
        slug: node.frontmatter.slug,
        title: node.frontmatter.title,
        tags: ['All'],
        next: pageIndex === artwork.length - 1 ? null : artwork[pageIndex + 1].node,
        prev: pageIndex === 0 ? null : artwork[pageIndex - 1].node
      },
    })
  })

  resumes.forEach(({ node }) => {
    if (!node.frontmatter.slug) {
      reporter.panicOnBuild(`Each resume Markdown file needs a frontmatter slug.`)
      return
    }

    actions.createPage({
      path: `/resume/${node.frontmatter.slug}/`,
      component: resumeTemplate,
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })

}



exports.createSchemaCustomization = ({ actions }) => {
  actions.createTypes(`
    type MarkdownRemarkFrontmatter {
      type: String
      slug: String
      title: String
      headline: String
      email: String
      phone: String
      location: String
      website: String
      active: Boolean
    }
  `)
}

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
