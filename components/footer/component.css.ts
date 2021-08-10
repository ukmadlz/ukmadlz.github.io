import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/var.css'

export const footer = style({
    color: vars.color.white,
    marginTop: "1rem"
});
export const footer_topbar = style({
    padding: "1rem",
    '@media': {
       print: {
            display: 'none',
        }
    },
});
export const footer_topbar_flex = style({
    display: 'flex',
    alignItems: "center",
});
export const footer_topbar_text = style({
    fontFamily: `${vars.fontFamily.headings} !important`,
    flexGrow: 1,
});
export const footer_bottombar = style({
    flexDirection: 'column',
    flexWrap: 'wrap',
    padding: '1rem',
    background: vars.color.black,
});
export const footer_bottombar_flex = style({
    display: 'flex',
});
export const footer_bottombar_copyright = style({
    flexGrow: 1,
});
export const footer_bottombar_icons = style({
    display: 'inline-block',
    position: 'relative',
    top: '0.2rem',
    '@media': {
        print: {
            color: vars.color.black,
        }
    }
});