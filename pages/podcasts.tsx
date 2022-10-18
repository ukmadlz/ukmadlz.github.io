import { faAlgolia, faAws, faBitbucket, faCloudflare, faCss3, faDigitalOcean, faDocker, faGithub, faHtml5, faJs, faLaravel, faLinux, faMicrosoft, faNodeJs, faPhp, faReact, faStackOverflow, faStripe, faYarn } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Fab, Grid, Link, Card, CardHeader, CardContent, Tooltip, Typography, Avatar, CardActions, Button } from '@material-ui/core'
import React from 'react'
import Layout from '../components/layout/component'
import { socials } from '../components/socials/component'
import * as styles from '../styles/resume.css'
import Axios from 'axios'

interface Podcast {
  id: string,
  title: string,
  description: string,
  url: string,
  timestamp: Date,
  type: string,
  source: string,
}
interface PodcastsProps {
  podcasts: [Podcast]
}

export default function Podcasts ({ podcasts }: PodcastsProps) {
  return (<Layout
    title="Podcasts"
    description="The podcasts that Mike has produced or been part of"
    color="purple"
    heroImageName="mike-screaming"
  >
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Typography paragraph>
          {`I'm lucky enough to have had the chance to start a couple of podcasts, as well as appear as a guest on others.`}
        </Typography>
        <Typography paragraph>
          {`My current personal hobby podcast is `}
          <Link href="https://anchor.fm/tech-off-topic" target="_blank">Tech: Off-topic</Link>
          {` which is usually every other week with my friend `}
          <Link href="https://twitter.com/secondej" target="_blank">Jim Seconds</Link>
          {`.`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h4" component="h2" color="textSecondary">
          {`Episodes`}
        </Typography>
        {podcasts.map(podcast => {
          return (
            <Card key={`${podcast.id}-episode`}>
              <Link href={podcast.url} target="_blank">
                <CardHeader
                  title={podcast.title}
                />
              </Link>
              <CardContent>
                <Typography paragraph variant="body2">
                <div dangerouslySetInnerHTML={{__html: podcast.description}}></div>
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary" href={podcast.url}>
                  Listen
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
  const { data } = await Axios('/api/podcasts',{
    baseURL: process.env.NEXT_PUBLIC_UKMADLZ_API || 'http://localhost:8888'
  })
  const podcasts = (data.data) ? data.data : [];
  // If there is a user, return it.
  return { props: { podcasts } }
}