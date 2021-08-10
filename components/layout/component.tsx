import { Container, Typography } from '@material-ui/core'
import Head from '../head/component'
import Navigation from '../navigation/component'
import Hero from '../hero/component'
import Footer from '../footer/component'
import * as styles from './component.css'
import { raw, vars } from '../../styles/var.css'

export default function LayoutComponent({ children, title, description, color, heroImageName }: any): JSX.Element {
  const colorVar = vars.color[color];
  return (<div>
    <Head title={title} description={description} />
    <Navigation />
    <Hero
      imageName={heroImageName}
      color={color}
    />

    <Container fixed>
      <main>
        <Typography className={styles.header} variant="h1" style={{
            color: colorVar
        }}>
          {title}
        </Typography>
        <div>
          {children}
        </div>
      </main>
    </Container>

    <Footer color={colorVar} />
  </div>)
}