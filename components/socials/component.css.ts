import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/var.css'

export const socialLink = style({
  margin: "0.75rem !important",
  color: `${vars.color.white} !important`,
  ':hover': {
    color: `${vars.color.black} !important`,
  }
});
export const socialLinkIcon = style({
  width: "2.5rem",
});