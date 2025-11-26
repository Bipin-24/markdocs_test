# Markdoc docs

[Markdoc](https://markdoc.dev) is a [Markdown](https://commonmark.org)-based syntax and toolchain for creating custom documentation sites and experiences.
We designed Markdoc to power [Stripe's public docs](http://stripe.com/docs), our largest and most complex content site.

## Contributing

Contributions and feedback are welcomed and encouraged. Feel free to open PRs here, or open issues in the [Markdoc core repo](https://github.com/markdoc/markdoc).

## Installation

1. [Fork](https://help.github.com/articles/fork-a-repo) and [clone](https://help.github.com/articles/cloning-a-repository) this repository to your local environment.

2. Create a new branch with `git checkout -b <BRANCH_NAME>`

3. Install the dependencies by running `npm install`

4. **Configure Algolia DocSearch (Optional)**

   To enable the search functionality:
   
   - Apply for Algolia DocSearch at https://docsearch.algolia.com/apply/ (free for documentation sites)
   - Or create an Algolia account at https://www.algolia.com/
   - Copy `.env.local.example` to `.env.local`
   - Add your Algolia credentials:
     ```
     NEXT_PUBLIC_ALGOLIA_APP_ID=your_app_id
     NEXT_PUBLIC_ALGOLIA_API_KEY=your_search_api_key
     ```
   - For Netlify deployment, add these as environment variables in Site Settings → Environment Variables

5. Start the development server on [http://localhost:3000](http://localhost:3000) by running `npm run dev`

6. Try editing `pages/index.md`

## Building for Production

```bash
npm run build
```

This will generate a static export in the `out` folder that can be deployed to any static hosting service.

## Deployment

The site is configured for static export and can be deployed to:
- **Netlify**: Connect your repository and it will auto-deploy
- **Vercel**: Run `vercel --prod`
- **GitHub Pages**: Deploy the `out` folder
- **Any static hosting**: Upload the `out` folder contents

## Code of conduct

This project has adopted the Stripe [Code of conduct](https://github.com/markdoc/markdoc/blob/main/.github/CODE_OF_CONDUCT.md).

## License

This project uses the [MIT license](LICENSE).
