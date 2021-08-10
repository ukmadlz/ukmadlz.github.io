import React from 'react';
import { buildUrl } from 'cloudinary-build-url';
import { raw } from '../../styles/var.css'
import * as styles from './component.css'

export default function HeroComponent({ imageName, color }: any): JSX.Element {
  
  const url = buildUrl(`elsmore.me/${imageName}`, {
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    },
    transformations: {
      effect: `tint:100:${raw.color[color].substr(1)}`,
      resize: {
        type: "scale",
        width: "2000"
      }
    }
  });

  return (
    <div style={{
        backgroundImage: `url(${url})`
      }}
      className={styles.heroImage}
    >
    </div>
  )
}