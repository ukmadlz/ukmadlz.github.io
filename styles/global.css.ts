import { globalStyle } from '@vanilla-extract/css';
import { vars } from './var.css';

globalStyle('*', {
  "boxSizing": "border-box"
})
globalStyle('body', {
  "all": "unset",
  "fontFamily": 'Arial',
})
