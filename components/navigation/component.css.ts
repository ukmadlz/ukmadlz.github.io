import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/var.css'

export const appbar = style({
    flexWrap: 'wrap',
    fontFamily: vars.fontFamily.headings,
});
export const toolbar = style({
    fontFamily: vars.fontFamily.headings,
    background: vars.color.black,
});
export const logo_link = style({
    flexGrow: 1,
});
export const navigation = style({
    fontFamily: vars.fontFamily.headings,
    display: "block",
});
export const navigation_link = style({
    color: vars.color.white,
    fontFamily: vars.fontFamily.headings,
    float: "left",
    padding: "1em 0.5em"
});
export const navigation_link_text = style({
    color: vars.color.white,
    fontFamily: `${vars.fontFamily.headings} !important`,
});