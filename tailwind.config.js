/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts}",
    './node_modules/tw-elements/dist/js/**/*.js'
  ],
  purge: {
    enabled: true,
    content: [
      "./src/**/*.{html,js,ts}",
      './node_modules/tw-elements/dist/js/**/*.js'
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio')
  ],
}
