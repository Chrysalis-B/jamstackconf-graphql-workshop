import React from "react"
import { Helmet } from "react-helmet"
import { graphql } from "gatsby"

export default function Template({ data }) {
  const { gcms } = data
  return (
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${gcms.codeEntries.title}`} />
      <div className="blog-post">
        <h1>{gcms.codeEntries.title}</h1>
      </div>
    </div>
  )
}

export const pageQuery = graphql`
query EntryQuery($slug: String!) {
    gcms {
      codeEntries(where: {
        slug: $slug
      }) {
        title
        slug
      }
    }
  }
`


