import { Link } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faMedium, faTwitch, faTwitter, faDev } from '@fortawesome/free-brands-svg-icons';
import * as styles from './component.css'

export default function SocialListComponent(): JSX.Element {
    return (<div>
        <Link
            href="https://twitter.com/ukmadlz"
            target="_blank"
            className={styles.socialLink}
        >
            <FontAwesomeIcon icon={faTwitter} className={styles.socialLinkIcon}/>
        </Link>
        <Link
            href="https://github.com/ukmadlz"
            target="_blank"
            className={styles.socialLink}
        >
            <FontAwesomeIcon icon={faGithub} className={styles.socialLinkIcon}/>
        </Link>
        <Link
            href="https://twitch.tv/ukmadlz"
            target="_blank"
            className={styles.socialLink}
        >
            <FontAwesomeIcon icon={faTwitch} className={styles.socialLinkIcon}/>
        </Link>
        <Link
            href="https://medium.com/@ukmadlz"
            target="_blank"
            className={styles.socialLink}
        >
            <FontAwesomeIcon icon={faMedium} className={styles.socialLinkIcon}/>
        </Link>
        <Link
            href="https://dev.to/ukmadlz"
            target="_blank"
            className={styles.socialLink}
        >
            <FontAwesomeIcon icon={faDev} className={styles.socialLinkIcon}/>
        </Link>
    </div>)
}
