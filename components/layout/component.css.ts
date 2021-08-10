import { style } from '@vanilla-extract/css'
import { vars } from '../../styles/var.css'

export const header = style({
    fontFamily: `${vars.fontFamily.headings} !important`,
    fontSize: '4em !important',
});