import { AppBar, Toolbar, Typography, Link } from '@material-ui/core'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import * as styles from './component.css'

const navigationLinks = [
    {
        label: 'Engineering',
        link: '/engineering'
    },
    {
        label: 'Events',
        link: '/events'
    },
    {
        label: 'Streaming',
        link: '/streaming'
    },
    {
        label: 'Mentoring',
        link: '/mentoring'
    },
    {
        label: 'Podcasting',
        link: '/podcasting'
    },
]

export default function NavigationComponent(): JSX.Element {
    return (
        <AppBar position="static" color="default" elevation={0} className={styles.appbar}>
            <Toolbar className={styles.toolbar}>
                <Link href='/'
                        className={styles.logo_link}>
                    <Image
                        src="/images/mike_elsmore_white.svg"
                        width={200}
                        height={50}
                        alt="Mike Elsmore"
                    />
                </Link>
                <nav className={styles.navigation}>
                    {navigationLinks.map((link, i) => (
                        <Link variant="button" className={styles.navigation_link} href={link.link} key={`nav-link-${i}`}>
                            <Typography className={styles.navigation_link_text} >{link.label}</Typography>
                        </Link>
                    ))}
                    <Link variant="button" className={styles.navigation_link} href="to:mike@elsmore.me" target="_blank">
                        <Typography className={styles.navigation_link_text} ><FontAwesomeIcon icon={faEnvelope} /></Typography>
                    </Link>
                    <Link variant="button" className={styles.navigation_link} href="https://twitter.com/ukmadlz" target="_blank">
                        <Typography className={styles.navigation_link_text} ><FontAwesomeIcon icon={faTwitter} /></Typography>
                    </Link>
                </nav>
            </Toolbar>
        </AppBar>
    );
}