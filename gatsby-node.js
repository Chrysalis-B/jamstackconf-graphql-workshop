/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

exports.createResolvers = ({ createResolvers }) => {
    const resolvers = {
        GCMS_CodeEntry: {
            mo_products: {
                type: [`MoltinProduct`],
                resolve: (source, args, context, info) => {
                    return context.nodeModel.runQuery({
                        query: {
                            filter: {
                                sku: {
                                    in: source.music,
                                },
                            },
                        },
                        type: "MoltinProduct",
                        firstOnly: false
                    })
                }
            }
        }
        }
        createResolvers(resolvers)
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
  
    return new Promise((resolve, reject) => {
      const codeEntryTemplate = path.resolve(`src/layouts/entryLayout.js`)
      resolve(
        graphql(
          `
            {
                gcms {
                    codeEntries {
                      slug
                    }
                  }
            }
          `
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
  
          // Create pages for each markdown file.
          result.data.gcms.codeEntries.forEach(({ slug }) => {
            createPage({
              path: slug,
              component: codeEntryTemplate,
              // In your blog post template's graphql query, you can use path
              // as a GraphQL variable to query for data from the markdown file.
              context: {
                slug,
              },
            })
          })
        })
      )
    })
  }