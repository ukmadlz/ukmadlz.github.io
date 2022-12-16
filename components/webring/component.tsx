import Script from 'next/script';
import * as styles from './component.css'

export function WebringComponent() {
    return (<div className={styles.webringContainer}>
        <the-claw-webring-widget></the-claw-webring-widget>
        <Script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module" />
    </div>)
}