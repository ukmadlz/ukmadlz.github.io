import { Typography } from '@material-ui/core'
import Layout from '../components/layout/component'

export default function Resume () {
  return (<Layout
    title="Mike's Resume"
    description="My professional career so far"
    color="dark-blue"
    heroImageName="mike-at-work"
  >
  <Typography>As with most people in software, I spend most of my life at a keyboard, but I'm lucky that my hobby is my job. I spend my time helping others (and myself) to learn new things and occasionally solve different and difficult problems.</Typography>
  </Layout>)
}
