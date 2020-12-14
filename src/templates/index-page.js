import React from 'react';
import clsx from 'clsx';
import { graphql } from 'gatsby';
import { Link } from 'gatsby-theme-material-ui';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import AppShell from '../components/appShell';


// import Features from '../components/Features'
// import BlogRoll from '../components/BlogRoll'

const useStyles = (image) => makeStyles((theme) => ({
  fullWidthImage: {
    width: '100vw',
    height: '400px',
    backgroundSize: 'cover',
    backgroundPosition: 'bottom',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  marginTop0: {
    marginTop: [[0], '!important']
  },
  title: {
    boxShadow:
      'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
    backgroundColor: 'rgb(255, 68, 0)',
    color: 'white',
    lineHeight: '1',
    padding: '0.25em',
    fontWeight: 'bold'
  },
  subheading: {
    boxShadow: 'rgb(255, 68, 0) 0.5rem 0px 0px, rgb(255, 68, 0) -0.5rem 0px 0px',
    backgroundColor: 'rgb(255, 68, 0)',
    color: 'white',
    lineHeight: '1',
    padding: '0.25em',
  },
  titleDiv: {
    display: 'flex',
    height: '150px',
    lineHeight: '1',
    justifyContent: 'space-around',
    alignItems: 'left',
    flexDirection: 'column'
  },
  content: {
    listStyle: 'none',
    marginBottom: 0,
    marginLeft: 0,
    marginRight: '1.5rem',
    marginTop: '1.5rem',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignItems: 'center',
    li: {
      padding: '0 2rem 1rem 0',
      marginBottom: '1.5rem',
      marginTop: 0
    }
  },
  outerDiv: {
    backgroundImage: `url(${
      !!image.childImageSharp ? image.childImageSharp.fluid.src : image
    })`,
    backgroundPosition: `top left`,
    backgroundAttachment: `fixed`,
  }
}));

export const IndexPageTemplate = ({
  image,
  title,
  heading,
  subheading,
  mainpitch,
  description,
  intro,
}) => {
  const classes = useStyles(image);

  return (
    <div>
      <div
        className={clsx(classes.outerDiv, classes.fullWidthImage, classes.marginTop0)}        
      >
        <div className={classes.titleDiv}>
          <Typography variant="h1" className={classes.title}>
            {title}
          </Typography>
          <Typography variant="h3" className={classes.subheading}>
            {subheading}
          </Typography>
        </div>
      </div>
      <section className="section section--gradient">
        <div className="container">
          <div className="section">
            <div className="columns">
              <div className="column is-10 is-offset-1">
                <div className="content">
                  <div className="content">
                    <div className="tile">
                      <Typography variant="h1" className={classes.title}>{mainpitch.title}</Typography>
                    </div>
                    <div className="tile">
                      <Typography variant="subtitle1" className={classes.subtitle}>{mainpitch.description}</Typography>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column is-12">
                      <Typography variant="h3">{heading}</Typography>
                      <Typography variant="body1">{description}</Typography>
                    </div>
                  </div>
                  {/* <Features gridItems={intro.blurbs} /> */}
                  <div className="columns">
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/products">
                        See all products
                      </Link>
                    </div>
                  </div>
                  <div className="column is-12">
                    <Typography variant="h3">
                      Latest stories
                    </Typography>
                    {/* <BlogRoll /> */}
                    <div className="column is-12 has-text-centered">
                      <Link className="btn" to="/blog">
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  return (
    <AppShell>
      <IndexPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heading={frontmatter.heading}
        subheading={frontmatter.subheading}
        mainpitch={frontmatter.mainpitch}
        description={frontmatter.description}
        intro={frontmatter.intro}
      />
    </AppShell>
  )
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heading
        subheading
        mainpitch {
          title
          description
        }
        description
        intro {
          blurbs {
            image {
              childImageSharp {
                fluid(maxWidth: 240, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            text
          }
          heading
          description
        }
      }
    }
  }
`;