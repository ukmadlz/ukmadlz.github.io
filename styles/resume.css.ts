import { style } from '@vanilla-extract/css'
import { vars } from '../styles/var.css'

export const contactLinkText = style({
  color: `${vars.color.black} !important`,
})
export const contactLinkIcon = style({
  width: "1rem",
});
export const skillsIcon = style({
  width: "2rem",
  margin: "0.5rem"
})