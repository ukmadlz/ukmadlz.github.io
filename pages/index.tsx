import { Typography } from '@material-ui/core'
import React from 'react'
import Script from 'next/script'
import Layout from '../components/layout/component'

export default function Home() {
  return (<Layout
    title="Welcome to my little part of the world"
    description=""
    color="orange-red"
    heroImageName="hackference-laugh"
  >
    <Typography>Mike Elsmore is a software developer, technologist, public speaker, and community builder who is passionate about developer outreach, education, and open source software. He is driven by the need to get involved with growing communities and with bringing technology to those with an interest or desire to learn. He has been involved in the Birmingham tech and hackathon scene for a long time, having founded //ackference and helped to spawn several other events.</Typography>
    <the-claw-webring-widget theme="light" hideMembers="true"></the-claw-webring-widget>
    <Script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module" />
  </Layout>
  )
}
