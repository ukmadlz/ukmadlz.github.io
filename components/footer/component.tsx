import Image from 'next/image'
import { Typography, Link } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import SocialList from '../socials/component'
import * as styles from './component.css'

export default function FooterComponent({ color }): JSX.Element {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_topbar} style={{
        background: color,
      }}>
        <div className={styles.footer_topbar_flex}>
          <Typography variant="h4" className={styles.footer_topbar_text}>
            Developer, Technologist, Speaker,<br/>Community Organiser
          </Typography>
          <SocialList/>
        </div>
      </div>
      <div className={styles.footer_bottombar}>
        <div className={styles.footer_bottombar_flex}>
          <div className={styles.footer_bottombar_copyright}>
            <Typography>
              {'Copyright © '}
              <Link color="inherit" href="/">
                Elsmore.me
              </Link>{' '}
              {new Date().getFullYear()}
              {'.'}
            </Typography>
          </div>
          <div>
            <Typography>
              {'Built with '}
              <FontAwesomeIcon icon={faHeart} width="1.45rem" />
              {' by '}
              <Image alt="Built with love by Mike Elsmore" src="/images/mike-elsmore-white.svg" width="25rem" height="25rem" />
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  )
}