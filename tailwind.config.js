module.exports = {
  purge: {
    options: {
      safeList: [
        'rounded-full',
        'mx-auto'
      ]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#6556ff',
        dark: '#292d3e',
        danger: '#ff788e',
        light: '#e8e8e8'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
