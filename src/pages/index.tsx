// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

type Data = {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    edges: {
      node: {
        excerpt: string
        frontmatter: {
          title: string
          date: string
          updated: string
          tags: string
          summary: string
        }
        timeToRead: int
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BlogIndex = ({ data }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle}>
      <SEO title="Sam" />
      {posts.map(({ node }) => {
        if (node.frontmatter.title === '') { return }
        const title = node.frontmatter.title || node.fields.slug
        const date = node.frontmatter.updated || node.frontmatter.date
        const readTime = <>{node.timeToRead} min</>
        return (
          <article key={node.fields.slug}>
            <header>
                <Link style={{ boxShadow: `none` }}
                to={node.fields.slug}>
                  {title}
                </Link>
              <small> - {readTime} {date}</small>
            </header>
            <section>
              <div
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.summary
                }}
              />
              <br/>
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
        sort: { fields: [frontmatter___updated], order: DESC },
        filter: { frontmatter: {parent: {glob: "Blogging"}}},
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY, MM, DD")
            updated(formatString: "YYYY, MM, DD")
            title
            summary
            tags
          }
          timeToRead
        }
      }
    }
  }
`
