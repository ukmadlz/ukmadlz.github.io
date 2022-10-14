import { faAlgolia, faAws, faBitbucket, faCloudflare, faCss3, faDigitalOcean, faDocker, faGithub, faHtml5, faJs, faLaravel, faLinux, faMicrosoft, faNodeJs, faPhp, faReact, faStackOverflow, faStripe, faYarn } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fab, Grid, Link, Card, CardHeader, CardContent, Tooltip, Typography, Avatar, CardActions, Button } from '@material-ui/core'
import React from 'react'
import Layout from '../components/layout/component'
import { socials } from '../components/socials/component'
import * as styles from '../styles/resume.css'
import Axios from 'axios'

interface Blog {
  id: string,
  title: string,
  description: string,
  url: string,
  timestamp: Date,
  type: string,
  source: string,
}
interface BlogsProps {
  blogs: [Blog]
}

export default function Blogs ({ blogs }: BlogsProps) {
  return (<Layout
    title="Blogs"
    description="Any blog posts the internet has by Mike, or featuring Mike… for some reason"
    color="orange-red"
    heroImageName="mike-screaming"
  >
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography paragraph>
          {`I'm not a great writer, but here is some of what I've written across the internet.`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        {blogs.map(blog => {
          return (
            <Card key={`${blog.id}-episode`}>
              <Link href={blog.url} target="_blank">
                <CardHeader
                  title={blog.title}
                />
              </Link>
              <CardContent>
                <Typography paragraph variant="body2">
                <div dangerouslySetInnerHTML={{__html: blog.description}}></div>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={blog.url}>
                  Read Mode
                </Button>
              </CardActions>
            </Card>
          )
        })}

      </Grid>
    </Grid>
    
  </Layout>)
}

export async function getServerSideProps() {
  const { data } = await Axios('http://api.elsmore.me/blogs')
  const blogs = (data.data) ? data.data : [];
  // If there is a user, return it.
  return { props: { blogs } }
}