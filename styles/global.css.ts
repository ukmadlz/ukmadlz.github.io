import { globalStyle } from '@vanilla-extract/css';
import { vars } from './var.css';

globalStyle('*', {
  "boxSizing": "border-box"
})
globalStyle('body', {
  "all": "unset",
  "fontFamily": "Arial",
})
globalStyle('.MuiTypography-body1', {
  fontSize: "1.5rem",
  '@media': {
    print: {
      fontSize: "1.1rem",
    }
  }
})