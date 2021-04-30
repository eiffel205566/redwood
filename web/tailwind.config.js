module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      zIndex: {
        '-10': '-10',
        '-11': '-11',
        '-12': '-12',
        '-13': '-13',
        1: '1',
        2: '2',
        3: '3',
      },
      backgroundColor: (theme) => ({
        ...theme('colors'),
        sideDark: '#252525',
        overlay: '#3a3a3a',
        danger: '#e3342f',
      }),
      textColor: (theme) => ({
        ...theme('colors'),
        displayOnly: '#7e7e7e',
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

//#7e7e7e
