import { Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faMedium, faTwitch, faTwitter, faDev, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import * as styles from './component.css'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export const socials = [{
    name: 'Twitter',
    link: 'https://twitter.com/ukmadlz',
    logo: <FontAwesomeIcon icon={faTwitter} className={styles.socialLinkIcon}/>,
  },{
    name: 'GitHub',
    link: 'https://github.com/ukmadlz',
    logo: <FontAwesomeIcon icon={faGithub} className={styles.socialLinkIcon}/>,
  },{
    name: 'Twitch',
    link: 'https://twitch.tv/ukmadlz',
    logo: <FontAwesomeIcon icon={faTwitch} className={styles.socialLinkIcon}/>,
  },{
    name: 'LinkedIn',
    link: 'https://www.linkedin.com/in/mikeelsmore',
    logo: <FontAwesomeIcon icon={faLinkedin} className={styles.socialLinkIcon}/>,
  },{
    name: 'Dev.to',
    link: 'https://dev.to/ukmadlz',
    logo: <FontAwesomeIcon icon={faDev} className={styles.socialLinkIcon}/>,
  },{
    name: 'Medium',
    link: 'https://medium.com/@ukmadlz',
    logo: <FontAwesomeIcon icon={faMedium} className={styles.socialLinkIcon}/>,
  },{
    name: 'E-mail',
    link: 'mailto:mike@elsmore.me?subject=Hi Mike',
    logo: <FontAwesomeIcon icon={faEnvelope} className={styles.socialLinkIcon}/>,
  },]

export default function SocialListComponent(): JSX.Element {
    return (<div>
        {socials.map((social, index) => {
            return (<Link
            href={social.link}
            target="_blank"
            className={styles.socialLink}
            key={`social-links-${index}`}
        >
            {social.logo}
        </Link>
        )})}
    </div>)
}
