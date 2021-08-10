import { createGlobalTheme } from '@vanilla-extract/css';

const color = {
  black: '#000',
  white: '#fff',
  'orange-red': '#FC7753',
  orange: '#FFBE54',
  yellow: '#F6E036',
  green: '#D0D91F',
  teal: '#8CDCB6',
  blue: '#57D7DB',
  'dark-blue': '#47B8D1',
  purple: '#BB98B6',
}

export const vars = createGlobalTheme(':root', {
  color,
  fontFamily: {
    headings:
      '"Unica One", sans-serif',
  },
});
export const raw = {
  color,
}