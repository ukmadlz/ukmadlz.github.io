import Head from '../components/head/component'
import Navigation from '../components/navigation/component'
import Hero from '../components/hero/component'
import Footer from '../components/footer/component'
import { Typography } from '@material-ui/core'
import Layout from '../components/layout/component'

export default function Home() {
  return (<Layout
    title="Welcome to my little part of the world"
    description=""
    color="orange-red"
    heroImageName="hackference-laugh"
  >
  <Typography variant="subtitle1">As with most people in software, I spend most of my life at a keyboard, but I'm lucky that my hobby is my job. I spend my time helping others (and myself) to learn new things and occasionally solve different and difficult problems.</Typography>
  </Layout>
  )
}
