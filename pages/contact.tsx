import { Link, Typography, Grid } from '@material-ui/core'
import Layout from '../components/layout/component'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { socials } from '../components/socials/component'
import * as styles from '../styles/resume.css'
import React from 'react'

export default function Contact(): JSX.Element {
    return(<Layout
        title="Contact Information"
        description="Contact Mike Elsmore by every means"
        color="yellow"
        heroImageName=""
      >
        <Typography paragraph>
        {`I have a really nifty little NPM module with all my contact details; just use the following commands:`}
        </Typography>
        <SyntaxHighlighter language="javascript">
        {`npm i -g ukmadlz \nukmadlz`}
        </SyntaxHighlighter>
        <Typography paragraph>
        {`If you'd like a more traditional means of contacting me, you can reach me via my twitter`}
        <Link href="https://twitter.com/ukmadlz" >@ukmadlz</Link>
        {`or you can send me an email at `}
        <Link href="mailto:mike@elsmore.me" target="_blank">mike@elsmore.me</Link>
        </Typography>
        <Typography paragraph>
        {`Or you can reach my at any of the links below:`}
        </Typography>
        <Grid container spacing={1}>
          {socials(styles.contactLinkIcon).map((social, index) => {
            const displayLink = (social.name === "E-mail") ? "mike@elsmore.me" : social.link; 
            return (
              <Grid item xs={6} md={12}  key={`social-contact-${index}`}>
                <Typography>
                  <Link href={social.link} target="_blank" className={styles.contactLinkText} >
                    {social.logo} {displayLink}
                  </Link> 
                </Typography>
              </Grid>
            )
          })}
        </Grid>
    </Layout>)
}