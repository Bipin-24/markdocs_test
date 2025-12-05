# Algolia DocSearch Implementation - actiandocportal.vercel.app

## Configuration Details

This repository is configured with Algolia DocSearch for **https://actiandocportal.vercel.app/**

### Credentials

- **App ID**: `Q546VCD9X0`
- **Index Name**: `Spiti`
- **API Key**: `87154ac722cba9c66802d86c423427f8`
- **AI Assistant**: Optional (configure in `.env.local`)

## Local Development

### Environment Variables

The `.env.local` file contains:

```bash
NEXT_PUBLIC_ALGOLIA_APP_ID=Q546VCD9X0
NEXT_PUBLIC_ALGOLIA_API_KEY=87154ac722cba9c66802d86c423427f8
NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID=YOUR_ALGOLIA_ASSISTANT_ID
```

### Testing Locally

1. **Ensure environment variables are set**:
   ```bash
   cat .env.local
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Visit**: http://localhost:3000
4. **Test search**: Click the search icon in the top navigation

## Vercel Deployment

### Required Environment Variables

Add these to Vercel Dashboard:

1. Go to: https://vercel.com/your-username/markdocs-test/settings/environment-variables

2. Add the following variables:

| Variable Name | Value | Environments |
|--------------|-------|--------------|
| `NEXT_PUBLIC_ALGOLIA_APP_ID` | `Q546VCD9X0` | Production, Preview, Development |
| `NEXT_PUBLIC_ALGOLIA_API_KEY` | `87154ac722cba9c66802d86c423427f8` | Production, Preview, Development |
| `NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID` | `YOUR_ALGOLIA_ASSISTANT_ID` | Production, Preview, Development (optional) |

3. **Redeploy** the site after adding variables

### Quick Deploy Commands

```bash
# Using Vercel CLI
vercel env add NEXT_PUBLIC_ALGOLIA_APP_ID production preview development
# Enter: Q546VCD9X0

vercel env add NEXT_PUBLIC_ALGOLIA_API_KEY production preview development
# Enter: 87154ac722cba9c66802d86c423427f8

vercel env add NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID production preview development
# Enter: YOUR_ALGOLIA_ASSISTANT_ID

# Deploy
vercel --prod
```

## Features

### Current Implementation

- ✅ **React Component**: Uses `@docsearch/react` for Next.js integration
- ✅ **Conditional Rendering**: Hides search if credentials are missing
- ✅ **AI Assistant Support**: Ready for AI-powered search answers
- ✅ **Responsive**: Works on mobile and desktop
- ✅ **Dark Mode Support**: Styled for both light and dark themes

### Code Location

- **Component**: `/components/Shell/TopNav.js`
- **Environment**: `.env.local` (not committed to Git)
- **Example**: `.env.local.example` (template for team)

## Enabling AI Assistant

### Step 1: Create Assistant in Algolia

1. Visit: https://www.algolia.com/apps/Q546VCD9X0/assistant
2. Click "Create Assistant" or use existing one
3. Configure the Assistant:
   - **Name**: Documentation Assistant
   - **Data Source**: Select "Spiti" index
   - **Prompt**: Customize how AI answers questions

### Step 2: Get Assistant ID

1. Go to your Assistant settings
2. Copy the Assistant ID (looks like: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 3: Update Environment Variables

**Local**:
```bash
# Edit .env.local
NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID=your-actual-assistant-id
```

**Vercel**:
1. Go to Environment Variables settings
2. Edit `NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID`
3. Replace `YOUR_ALGOLIA_ASSISTANT_ID` with actual ID
4. Save and redeploy

### Step 4: Test

- Search for a query
- You should see AI-generated answers in the search results
- AI responses will appear based on your documentation content

## Index Configuration

### Algolia Index: "Spiti"

The search uses the **Spiti** index in Algolia. Ensure this index is:

1. **Created** in Algolia dashboard
2. **Populated** with documentation content
3. **Configured** with proper crawlers or API integration

### Crawler Configuration

If using Algolia Crawler:

```json
{
  "index_name": "Spiti",
  "start_urls": ["https://actiandocportal.vercel.app/"],
  "sitemap_urls": ["https://actiandocportal.vercel.app/sitemap.xml"],
  "selectors": {
    "lvl0": {
      "selector": "h1",
      "global": false,
      "default_value": "Documentation"
    },
    "lvl1": "h2",
    "lvl2": "h3",
    "lvl3": "h4",
    "lvl4": "h5",
    "text": "p, li, td"
  }
}
```

Visit: https://www.algolia.com/apps/Q546VCD9X0/crawler to configure.

## Implementation Details

### Search Component

The `Search` component in `TopNav.js`:

```javascript
function Search() {
  // Only render if credentials exist
  const hasAlgoliaConfig = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID && 
                          process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;
  
  if (!hasAlgoliaConfig) {
    return null;
  }

  // Check for AI Assistant
  const insights = process.env.NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID && 
                   process.env.NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID !== 'YOUR_ALGOLIA_ASSISTANT_ID';
  
  const searchConfig = {
    appId: process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    apiKey: process.env.NEXT_PUBLIC_ALGOLIA_API_KEY,
    indexName: "Spiti",
  };

  // Add AI features if configured
  if (insights) {
    searchConfig.insights = { insightsClient: null };
    searchConfig.askAi = process.env.NEXT_PUBLIC_ALGOLIA_ASSISTANT_ID;
  }
  
  return <DocSearch {...searchConfig} />;
}
```

### Why React Component Instead of JavaScript Client?

Your original code uses `@docsearch/js`:
```javascript
import docsearch from '@docsearch/js';
```

**We use `@docsearch/react` instead** because:

✅ **Better Next.js Integration**: Native React component support  
✅ **Server-Side Rendering**: Works with Next.js SSR  
✅ **Type Safety**: Better TypeScript support  
✅ **Same Features**: All DocSearch features including AI Assistant  
✅ **Already Installed**: No need to add new dependencies

Both approaches provide identical functionality, but the React component is better for Next.js projects.

## Troubleshooting

### Search icon not appearing locally

**Check**:
```bash
# Verify .env.local exists and has values
cat .env.local

# Restart dev server
npm run dev
```

### Search icon not appearing on Vercel

**Solution**:
1. Verify environment variables in Vercel dashboard
2. Ensure all 3 environments are selected (Production, Preview, Development)
3. Redeploy the site
4. Clear browser cache

### No search results

**Check**:
1. Index exists: https://www.algolia.com/apps/Q546VCD9X0/explorer/browse/Spiti
2. Index has records (should show documentation pages)
3. Crawler is running and populating data
4. Index name matches exactly: "Spiti"

### AI Assistant not working

**Check**:
1. Assistant is created in Algolia dashboard
2. Assistant ID is correct (no placeholder value)
3. Assistant is trained on "Spiti" index data
4. Environment variable is updated in both local and Vercel

## Monitoring & Analytics

### Algolia Dashboard Links

- **Application**: https://www.algolia.com/apps/Q546VCD9X0/
- **Index Browser**: https://www.algolia.com/apps/Q546VCD9X0/explorer/browse/Spiti
- **Analytics**: https://www.algolia.com/apps/Q546VCD9X0/analytics/
- **Crawler**: https://www.algolia.com/apps/Q546VCD9X0/crawler
- **AI Assistant**: https://www.algolia.com/apps/Q546VCD9X0/assistant

### Search Analytics

Track in Algolia dashboard:
- Search queries
- Click-through rates
- Popular searches
- Zero-result queries
- AI Assistant usage

## Security Notes

- ✅ API Key is **search-only** (safe to expose in browser)
- ✅ `.env.local` is in `.gitignore` (not committed)
- ✅ `NEXT_PUBLIC_*` prefix makes variables available to browser
- ⚠️ Never use **Admin API Key** in frontend code
- ⚠️ Keep production credentials separate from development

## Next Steps

1. ✅ **Local implementation complete** - Test at http://localhost:3000
2. ⏳ **Add to Vercel** - Configure environment variables in Vercel dashboard
3. ⏳ **Verify index** - Check "Spiti" index is populated in Algolia
4. ⏳ **Test on production** - Verify search works at https://actiandocportal.vercel.app/
5. ⏳ **Enable AI Assistant** (optional) - Configure Assistant in Algolia dashboard

## Support

- **Algolia Documentation**: https://www.algolia.com/doc/
- **DocSearch Documentation**: https://docsearch.algolia.com/
- **AI Assistant Guide**: https://www.algolia.com/doc/guides/ai-search/ai-assistant/
