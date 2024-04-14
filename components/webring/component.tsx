import Script from 'next/script';
import { DOMAttributes } from 'react';
import * as styles from './component.css'

type CustomElement<T> = Partial<T & DOMAttributes<T> & { children: any }>;

declare global {
  namespace JSX {
    interface IntrinsicElements {
      ['the-claw-webring-widget']: CustomElement<any>;
    }
  }
}

export function WebringComponent() {
    return (<div className={styles.webringContainer}>
        <the-claw-webring-widget theme="dark" hideMembers="true" fullWidth="true"></the-claw-webring-widget>
        <Script src="https://the-claw-webring-widget.netlify.app/the-claw-webring-widget.mjs" type="module" />
    </div>)
}