import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Img from 'gatsby-image'
import Disqus from '../Disqus/Disqus'
import './style.scss'

class PostTemplateDetails extends React.Component {
  render() {
    const NonStretchedImage = tempProps => {
      let normalizedProps = tempProps
      if (tempProps.fluid && tempProps.fluid.presentationWidth) {
        normalizedProps = {
          ...tempProps,
          style: {
            ...(tempProps.style || {}),
            maxWidth: tempProps.fluid.presentationWidth,
            margin: '0 auto', // Used to center the image
          },
        }
      }
      return <Img {...normalizedProps} />
    }
    const { subtitle, author } = this.props.data.site.siteMetadata
    const post = this.props.data.markdownRemark
    const tags = post.fields.tagSlugs
    // const featuredImage = post.frontmatter.featuredImage
    console.log('Front Matter in PostTemplateDetails is ')
    console.log(this.props)

    const homeBlock = (
      <div>
        <Link className="post-single__home-button" to="/">
          All Articles
        </Link>
      </div>
    )

    const tagsBlock = (
      <div className="post-single__tags">
        <ul className="post-single__tags-list">
          {tags &&
            tags.map((tag, i) => (
              <li className="post-single__tags-list-item" key={tag}>
                <Link to={tag} className="post-single__tags-list-item-link">
                  {post.frontmatter.tags[i]}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    )

    const commentsBlock = (
      <div>
        <Disqus
          postNode={post}
          siteMetadata={this.props.data.site.siteMetadata}
        />
      </div>
    )

    return (
      <div>
        {homeBlock}
        <div className="post-single">
          <div className="post-single__inner">
            <h1 className="post-single__title">{post.frontmatter.title}</h1>
            <NonStretchedImage
              fluid={post.frontmatter.featuredImage.childImageSharp.fluid}
            />
            <div
              className="post-single__body"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
            <div className="post-single__date">
              <em>
                Published {moment(post.frontmatter.date).format('D MMM YYYY')}
              </em>
            </div>
          </div>
          <div>{commentsBlock}</div>
          <div className="post-single__footer">
            {tagsBlock}
            <hr />
            <p className="post-single__footer-text">
              {subtitle}
              <a
                href={`https://twitter.com/${author.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <br /> <strong>{author.name}</strong> on Twitter
              </a>
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default PostTemplateDetails
