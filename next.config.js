const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc()({
  // output: 'export', // Commented out to allow API routes in dev mode
  reactStrictMode: true,
  pageExtensions: ['js', 'md', 'mdoc'],
  images: {
    unoptimized: true
  }
});
