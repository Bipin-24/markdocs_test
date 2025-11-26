const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc()({
  output: 'export',
  reactStrictMode: true,
  pageExtensions: ['js', 'md', 'mdoc'],
  images: {
    unoptimized: true
  }
});
