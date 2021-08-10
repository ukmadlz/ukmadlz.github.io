import { Typography } from '@material-ui/core'
import Layout from '../components/layout/component'

export default function Resume () {
  return (<Layout
    title="My work"
    description="My professional career so far"
    color="teal"
    heroImageName="mike-at-work"
  >
    <Typography paragraph>
      {`Having spent a few years as a full time Developer Advocate at IBM Watson Data Platform I'm now freelance. My job is to help companies and organisation to build software and applications, as well as to educate people interested in products. I love working with Open Source, and try to share it with others whenever possible through speaking, demoing or writing whenever possible.`}
    </Typography>
    <Typography paragraph>
      {`I founded //ackference in 2013 and it's been running every year ever since. I'm proud to say that it's a three-day event: a single day multitrack polyglot developer conference, followed by a weekend-long open hackathon.`}
    </Typography>
    <Typography paragraph>
      {`//ackference has always been run on the principle of Learn, Build, Share, an ethos first developed by Geeks of London for Hacked.io, creating an environment in which young and senior developers alike can flourish and grow both their skills and knowledge.`}
    </Typography>
  </Layout>)
}
