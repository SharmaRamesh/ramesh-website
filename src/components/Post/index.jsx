import React from 'react'
import { Link } from 'gatsby'
import moment from 'moment'
import Img from 'gatsby-image'
import './style.scss'

class Post extends React.Component {
  render() {
    const {
      title,
      date,
      category,
      description,
      featuredImage,
    } = this.props.data.node.frontmatter
    const { slug, categorySlug } = this.props.data.node.fields
    const NonStretchedImage = tempProps => {
      let normalizedProps = tempProps
      if (tempProps && tempProps.presentationWidth) {
        normalizedProps = {
          ...tempProps,
          style: {
            ...(tempProps.style || {}),
            maxWidth: tempProps.presentationWidth,
            margin: '0 auto', // Used to center the image
          },
        }
      }
      return <Img {...normalizedProps} />
    }

    return (
      <div className="post">
        <div className="post__meta">
          <time
            className="post__meta-time"
            dateTime={moment(date).format('MMMM D, YYYY')}
          >
            {moment(date).format('MMMM YYYY')}
          </time>
          <span className="post__meta-divider" />
          <span className="post__meta-category" key={categorySlug}>
            <Link to={categorySlug} className="post__meta-category-link">
              {category}
            </Link>
          </span>
        </div>
        <h2 className="post__title">
          <Link className="post__title-link" to={slug}>
            {title}
          </Link>
        </h2>
        <p className="post__description">{description}</p>
        <NonStretchedImage fluid={featuredImage.childImageSharp.fluid} />
        <Link className="post__readmore" to={slug}>
          Read
        </Link>
      </div>
    )
  }
}

export default Post
