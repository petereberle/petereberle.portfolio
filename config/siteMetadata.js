const productionSiteUrl = require("./productionSiteUrl")
const siteTitle = require("./siteTitle")

 const siteMetadata = {
    title: siteTitle.full,
    description: `I'm an artist, designer, and web developer with a focus on community-led organizations and organizations centered around the arts.`,
    image: './icons/icon.png',
    author: `Peter Eberle`,
    siteUrl: productionSiteUrl,
    lang: 'en'
  }

  module.exports = siteMetadata