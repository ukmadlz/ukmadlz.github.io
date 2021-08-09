import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/var.css'

export const appbar = style({
    flexWrap: 'wrap',
    fontFamily: vars.fontFamily.body,
});
export const toolbar = style({
    fontFamily: vars.fontFamily.body,
    background: vars.color.black,
});
export const logo_link = style({
    flexGrow: 1,
});
export const navigation = style({
    fontFamily: vars.fontFamily.body,
    display: "block",
});
export const navigation_link = style({
    color: vars.color.white,
    fontFamily: vars.fontFamily.body,
    float: "left",
    padding: "1em 0.5em"
});
export const navigation_link_text = style({
    color: vars.color.white,
    fontFamily: vars.fontFamily.body,
});