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
        'primary-light': '#887df9',
        dark: '#292d3e',
        danger: '#ff788e',
        light: '#e8e8e8'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          width: '100%',
          '@screen sm': {
            maxWidth: '100%',
          },
          '@screen md': {
            maxWidth: '704px',
          },
          '@screen lg': {
            maxWidth: '960px',
          },
          '@screen xl': {
            maxWidth: '1214px',
          },
          '@screen 2xl': {
            maxWidth: '1472px',
          },
        }
      })
    }
  ],
}
