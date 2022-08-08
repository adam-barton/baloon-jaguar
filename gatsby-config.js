module.exports = {
  siteMetadata: {
    title: `baloon-jaguar`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    'gatsby-plugin-postcss',
  ],
}
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
