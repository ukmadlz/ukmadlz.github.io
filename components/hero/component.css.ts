import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/var.css'

export const heroImage = style({
    width: "100",
    height: "50vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    '@media': {
       print: {
            display: 'none',
        }
    },
  });