import { style } from '@vanilla-extract/css'
import { vars } from '../styles/var.css'

export const contactLinkText = style({
  color: `${vars.color.black} !important`,
  "@media": {
    print: {
      fontSize: "0.85rem",
    }
  }
})
export const contactLinkIcon = style({
  width: "1rem",
});
export const skillsIcon = style({
  width: "2rem",
  margin: "0.5rem",
  "@media": {
    print: {
      width: "1rem",
      margin: "0",
    }
  }
})
export const job_card = style({
  margin: "0.25rem 0",
  "@media": {
    print: {
      margin: "0.1rem 0",
    }
  }
});
export const job_card_hidden = style({
  margin: "0.25rem 0",
  "@media": {
    print: {
      display: "none",
    }
  }
});