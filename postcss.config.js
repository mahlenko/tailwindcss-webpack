const tailwindcss = require('tailwindcss');

module.exports = {
  plugins: [
    require('postcss-import'),
    'postcss-preset-env',
    tailwindcss,
    require('autoprefixer')
  ],
}