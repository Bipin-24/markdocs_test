---
title: What is Markdoc?
description:
---

# {% $markdoc.frontmatter.title %}

{% callout type="note" %}
**Welcome!** This guide shows you exactly how to use Markdoc with live examples. Each feature includes the syntax you type and how it renders on the page.
{% /callout %}

{% youtube
  src="https://www.youtube-nocookie.com/embed/MAWK_VmjU1Y?controls=0"
  title="Introducing Markdoc"
  width="50%" /%}

## 🚀 Quick Start

Markdoc is a powerful Markdown extension created by Stripe. Think of it as **Markdown + Superpowers**!

### What Makes Markdoc Special?

| Feature | What It Does | Why You'll Love It |
|---------|--------------|-------------------|
| 📝 **Standard Markdown** | Write like normal Markdown | Easy to learn, familiar syntax |
| 🏷️ **Custom Tags** | Add React components | Build interactive docs |
| 🔄 **Variables** | Dynamic content | One source, many outputs |
| ⚙️ **Functions** | Transform data | Smart, automated content |
| ✅ **Validation** | Type-safe content | Catch errors early |

---

## 📖 Basic Markdown Features

Everything you know from Markdown works in Markdoc!

---

### 📌 Headers - Create Document Structure

{% callout type="note" %}
**Tip:** Use headers to organize your content. Screen readers and search engines love them!
{% /callout %}

**What you type:**
```markdown
# Main Title (H1)
## Section (H2)
### Subsection (H3)
```

**What you see:**

# Main Title (H1)
## Section (H2)
### Subsection (H3)
#### Smaller Heading (H4)
##### Even Smaller (H5)
###### Smallest Heading (H6)

---

### ✨ Text Formatting - Make Text Stand Out

| Type This | Get This | When to Use |
|-----------|----------|-------------|
| `**bold**` | **bold** | Important terms, key points |
| `*italic*` | *italic* | Emphasis, book titles |
| `~~strike~~` | ~~strike~~ | Removed or deprecated info |
| `` `code` `` | `code` | Function names, variables |

**Live Example:**

This is **really important**, this is *emphasized*, this is ~~old information~~, and this is a `variable` name.

---

### 🔗 Links - Connect Your Content

{% callout type="check" %}
**Pro Tip:** Add descriptive link text so users know where they're going!
{% /callout %}

**What you type:**
```markdown
[Click here](https://example.com)
[Hover for hint](https://example.com "This is a tooltip!")
```

**What you see:**

- [Visit our website](https://markdoc.dev)
- [Documentation with hint](https://markdoc.dev/docs "Opens official docs")
- [Internal link](/docs/overview)

---

### 🖼️ Images - Add Visuals

**What you type:**
```markdown
![Description](/logo.svg)
```

**What you see:**

![Markdoc Logo](/logo.svg)

{% callout type="note" %}
**Remember:** Always add descriptive alt text for accessibility!
{% /callout %}

---

### 📋 Lists - Organize Information

#### Unordered Lists (Bullets)

**What you type:**
```markdown
- First item
- Second item
  - Nested item
  - Another nested item
- Third item
```

**What you see:**

- Getting started guides
- API reference
  - Authentication
  - Endpoints
- Code examples
- Best practices

#### Ordered Lists (Numbers)

**What you type:**
```markdown
1. First step
2. Second step
3. Third step
```

**What you see:**

1. Install the package
2. Configure your settings
3. Run your first command
4. Check the output

#### Task Lists (Checkboxes)

**What you type:**
```markdown
- [x] Completed task
- [ ] Pending task
- [ ] Future task
```

**What you see:**

- [x] Read the documentation
- [x] Install dependencies
- [ ] Write your first doc
- [ ] Deploy to production

---

### 💻 Code - Show Technical Content

#### Inline Code

Use backticks for `inline code` like variable names or short commands.

#### Code Blocks

**What you type:**
````markdown
```javascript
function greet(name) {
  return `Hello, ${name}!`;
}
```
````

**What you see:**

```javascript
// JavaScript Example
function greet(name) {
  return `Hello, ${name}!`;
}

const message = greet("Developer");
console.log(message); // Output: Hello, Developer!
```

```python
# Python Example
def calculate_total(items):
    """Calculate the total price of items."""
    return sum(item.price for item in items)

total = calculate_total(cart_items)
print(f"Total: ${total}")
```

```bash
# Shell Commands
npm install @markdoc/markdoc
npm run dev
```

{% callout type="check" %}
**Syntax highlighting works automatically!** Just specify the language after the opening backticks.
{% /callout %}

---

### 💬 Blockquotes - Highlight Important Text

**What you type:**
```markdown
> Important information goes here.
> It can span multiple lines.
```

**What you see:**

> **Note from the team:** Markdoc is designed to be both powerful and easy to use. Start with basic Markdown, then add advanced features as you need them.

> **Quote:** "Documentation is a love letter that you write to your future self." - Damian Conway

---

### 📊 Tables - Display Structured Data

**What you type:**
```markdown
| Feature | Status | Notes |
|---------|--------|-------|
| Headers | ✅ | Works great |
| Lists | ✅ | Nested too |
| Tables | ✅ | You're looking at one! |
```

**What you see:**

| Feature | Status | Difficulty | Description |
|---------|--------|-----------|-------------|
| **Markdown** | ✅ Ready | Easy | Standard syntax |
| **Tags** | ✅ Ready | Medium | Custom components |
| **Variables** | ✅ Ready | Easy | Dynamic content |
| **Functions** | ✅ Ready | Medium | Data transformation |

#### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
|:-------------|:--------------:|--------------:|
| Default | Centered | Right |
| Text | More text | Numbers: 123 |

---

## 🎨 Markdoc Special Features

Now for the fun stuff! These features make Markdoc powerful.

---

### 🎯 Callouts - Grab Attention

{% callout type="note" %}
**Callouts** are perfect for highlighting important information that needs to stand out from regular content.
{% /callout %}

#### All Callout Types

{% callout type="note" %}
**💡 Note Callout** - Use for general information, tips, and helpful hints.

You can include **formatting**, `code`, and even [links](https://example.com) inside callouts!
{% /callout %}

{% callout type="warning" %}
**⚠️ Warning Callout** - Use for cautionary information that users should be aware of.

Perfect for deprecation notices or potential pitfalls.
{% /callout %}

{% callout type="caution" %}
**🚨 Caution Callout** - Use for critical warnings that could cause serious issues.

Great for: "Don't do this in production!" messages.
{% /callout %}

{% callout type="check" %}
**✅ Success Callout** - Use for positive outcomes, success messages, or best practices.

Celebrate wins and guide users to success!
{% /callout %}

**When to use each type:**

| Type | Use For | Example |
|------|---------|---------|
| 💡 Note | Tips, information | "Pro tip: Use keyboard shortcuts!" |
| ⚠️ Warning | Cautions, deprecations | "This API will be deprecated in v2.0" |
| 🚨 Caution | Critical warnings | "This will delete all your data!" |
| ✅ Success | Best practices, achievements | "You're all set up!" |

---

### 🔧 Variables - Make Content Dynamic

{% callout type="note" %}
**Variables** let you insert dynamic values into your content. Think of them as placeholders that get filled in when the page renders.
{% /callout %}

#### Basic Variable Syntax

Variables use the `$` prefix: `$variableName`

**What you can do:**

| Type | Syntax | Example Output |
|------|--------|----------------|
| Simple | `$userName` | John Doe |
| Nested | `$user.profile.email` | john@example.com |
| Array | `$items[0]` | First item |
| In tags | `type=$alertType` | Dynamic attribute |

**Real Example:**
```markdown
Welcome, $userName! 

Your email: $user.profile.email
Latest item: $items[0]

{​% callout type=$alertType %}
Dynamic message: $message
{​% /callout %}
```

{% callout type="check" %}
**When to use variables:** User info, configuration values, environment-specific data, or anything that changes based on context!
{% /callout %}

---

### ⚙️ Functions - Transform Your Data

{% callout type="note" %}
**Functions** process variables and content. They're like Swiss Army knives for your documentation!
{% /callout %}

#### Common Functions

| Function | What It Does | Example |
|----------|--------------|---------|
| `equals()` | Compare values | `equals($status, "active")` → true/false |
| `uppercase()` | MAKE IT LOUD | `uppercase($name)` → JOHN DOE |
| `lowercase()` | make it quiet | `lowercase($email)` → john@example.com |
| `titleCase()` | Capitalize Properly | `titleCase($title)` → Hello World |

**Usage Example:**
```markdown
{​% if equals($status, "active") %}
  ✅ Status is active
{​% /if %}

Company: {​% uppercase($companyName) %}
Email: {​% lowercase($userEmail) %}
Title: {​% titleCase($documentTitle) %}
```

{% callout type="check" %}
**Pro Tip:** Chain functions with conditions for powerful dynamic content. Example: Show admin panel only if `equals($role, "admin")` is true!
{% /callout %}

---

### 🎭 Custom Functions

You can create your own functions! Here's how:

```javascript
// In your Markdoc config
const config = {
  functions: {
    formatDate: {
      transform(parameters) {
        const [date] = parameters;
        return new Date(date).toLocaleDateString();
      }
    },
    calculateDays: {
      transform(parameters) {
        const [startDate, endDate] = parameters;
        const diff = new Date(endDate) - new Date(startDate);
        return Math.floor(diff / (1000 * 60 * 60 * 24));
      }
    }
  }
};
```

**Using Your Custom Functions:**
```markdown
Last updated: {​% formatDate($lastModified) %}
Time remaining: {​% calculateDays($today, $deadline) %} days
```

---

### 🏷️ Annotations - Add Attributes

{% callout type="note" %}
**Annotations** let you add HTML attributes to standard Markdown elements. Great for IDs, classes, and styling!
{% /callout %}

#### Common Uses

| Use Case | Syntax | Result |
|----------|--------|--------|
| Anchor links | `## Title {​% #my-id %}` | `<h2 id="my-id">Title</h2>` |
| CSS classes | `Text {​% .highlight %}` | `<span class="highlight">Text</span>` |
| Table widths | `Column {​% width="40%" %}` | Column sizing |

**Example:**
```markdown
## Quick Start Guide {​% #quick-start %}

This is [important]{​% .highlight .bold %} text.

{​% table %}
* Name {​% width="40%" %}
* Description {​% width="60%" %}
---
* API Key
* Your authentication token
{​% /table %}
```

{% callout type="check" %}
**Why use annotations?** They let you control HTML output without breaking Markdown's readability!
{% /callout %}

---

### 📄 Frontmatter - Document Metadata

{% callout type="note" %}
**Frontmatter** is like a business card for your document. It stores metadata at the top of your file.
{% /callout %}

#### Syntax

Frontmatter goes at the very top of your file, wrapped in `---`:

```yaml
---
title: API Documentation
author: Development Team
version: 2.0
lastUpdated: 2024-01-15
tags: [api, documentation, rest]
status: published
---
```

#### Using Frontmatter Values

Access frontmatter with `$markdoc.frontmatter`:

```markdown
# $markdoc.frontmatter.title

**Author:** $markdoc.frontmatter.author  
**Version:** $markdoc.frontmatter.version  
**Last Updated:** $markdoc.frontmatter.lastUpdated

{​% if equals($markdoc.frontmatter.status, "published") %}
✅ This document is published and ready to use!
{​% /if %}
```

**Common Frontmatter Fields:**

| Field | Purpose | Example |
|-------|---------|---------|
| `title` | Page title | "Getting Started" |
| `description` | SEO description | "Learn how to use our API" |
| `author` | Content creator | "Engineering Team" |
| `version` | Document version | "2.0" |
| `tags` | Categories/topics | ["api", "tutorial"] |
| `lastUpdated` | Modification date | "2024-01-15" |

{% callout type="check" %}
**Pro Tip:** Use frontmatter for SEO metadata, document organization, and conditional content display!
{% /callout %}

---

### 🧩 Partials - Reuse Content Everywhere

{% callout type="note" %}
**Partials** are reusable content snippets. Write once, use everywhere! Perfect for headers, footers, or repeated sections.
{% /callout %}

#### Creating a Partial

**Step 1:** Create a file in `markdoc/partials/`

**File: `markdoc/partials/header.md`**
```markdown
# $title

Navigation: [Home](/) | [Docs](/docs) | [API](/api)

---
```

**Step 2:** Use it in your documents

```markdown
{​% partial file="header.md" variables={title: "My Page"} /%}

Your page content here...
```

**When to use partials:**

| Use Case | Example |
|----------|---------|
| 🎯 Headers/Footers | Consistent navigation |
| 📢 Announcements | Same message across pages |
| 📋 Templates | Standard document structure |
| ⚠️ Disclaimers | Legal text across docs |

{% callout type="check" %}
**Pro Tip:** Update one partial file and all pages using it automatically update! No more copy-paste.
{% /callout %}

---

### 🎨 Node Customization - Control the Output

{% callout type="note" %}
**Nodes** are the building blocks of Markdown (headings, links, images, etc.). You can customize how they render!
{% /callout %}

#### Available Nodes

Here's what you can customize:

| Node Type | What It Is | Examples |
|-----------|------------|----------|
| `heading` | Headers | h1, h2, h3, h4, h5, h6 |
| `paragraph` | Text blocks | Regular paragraphs |
| `link` | Hyperlinks | [text](url) |
| `image` | Pictures | ![alt](src) |
| `list` | Lists | Ordered & unordered |
| `code` | Inline code | \`code\` |
| `fence` | Code blocks | \`\`\`language |
| `table` | Tables | All table elements |
| `blockquote` | Quotes | > quote |
| `strong` | Bold | **bold** |
| `em` | Italic | *italic* |

#### Custom Node Example

Make all headings include anchor links:

```javascript
// markdoc/nodes/heading.markdoc.js
export const heading = {
  render: 'Heading',
  attributes: {
    level: { type: Number, required: true, default: 1 },
    id: { type: String }
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config);
    const children = node.transformChildren(config);
    
    // Generate ID from content if not provided
    const id = attributes.id || generateID(children);
    
    return new Tag(
      `h${attributes.level}`,
      { ...attributes, id },
      children
    );
  }
};
```

**What this does:** Automatically creates anchor links for all headings!

{% callout type="check" %}
**Why customize nodes?** Add automatic IDs, custom classes, tracking, or any behavior to standard Markdown elements!
{% /callout %}

---

## 🎯 Quick Tips for Success

{% callout type="note" %}
Here are battle-tested tips to make your Markdoc experience smooth!
{% /callout %}

### ✅ Do This

| Tip | Why |
|-----|-----|
| **Use variables for repeated content** | Update once, change everywhere |
| **Create partials for common sections** | Headers, footers, disclaimers |
| **Add IDs to headings** | Makes linking easier: `## Title {​% #my-id %}` |
| **Use callouts for important info** | Grabs attention immediately |
| **Validate your content** | Catch errors before users see them |

### ❌ Avoid This

| Don't | Better Alternative |
|-------|-------------------|
| Hardcode values everywhere | Use variables: `$version` |
| Copy-paste repeated content | Create partials |
| Skip validation | Always validate to catch errors |
| Use too many custom tags | Keep it simple, use built-in features |

---

## 🚀 Best Practices

### 1. 🏗️ Structure Your Content

{% callout type="check" %}
Use proper heading hierarchy (h1 → h2 → h3) for better SEO and accessibility.
{% /callout %}

**Good:**
```markdown
# Main Title (h1)
## Section (h2)
### Subsection (h3)
```

**Bad:**
```markdown
# Main Title
### Skipped h2!
```

### 2. 🔄 Leverage Variables

Keep dynamic content in variables:

```markdown
---
version: 2.0
lastUpdated: 2024-01-15
---

Version: $version
Last updated: $lastUpdated
```

**Why?** Update once, changes everywhere automatically!

### 3. 🧩 Create Reusable Partials

Store common content in partials:

```markdown
{​% partial file="api-endpoint-template.md" /%}
```

**Use for:**
- API endpoint templates
- Common disclaimers
- Headers and footers
- Repeated sections

### 4. 🔍 Use Conditionals Wisely
### 4. 🔍 Use Conditionals Wisely

Show the right content to the right audience:

```markdown
{​% if $environment === "production" %}
🚀 Production API: https://api.example.com
{​% else /%}
🧪 Development API: https://dev.example.com
{​% /if %}

{​% if equals($userRole, "admin") %}
🔒 Admin Panel: [Access Dashboard](/admin)
{​% /if %}
```

**Great for:**
- Environment-specific docs
- Role-based content
- Feature flags
- Beta announcements

### 5. ✅ Validate Everything

Define strict schemas for custom tags:

```javascript
// Prevent errors before they happen!
attributes: {
  size: {
    type: String,
    matches: ['small', 'medium', 'large'],
    default: 'medium',
    errorLevel: 'critical'
  }
}
```

{% callout type="warning" %}
**Remember:** Validation catches errors at build time, not runtime. Your users will thank you!
{% /callout %}

---

## 🎨 Live Examples in Action

Here's how everything looks when rendered:

### Example 1: Rich Text Formatting

This paragraph shows **bold text**, *italic text*, `inline code`, and a [link to Markdoc](https://markdoc.dev). You can mix and match!

### Example 2: Lists with Rich Content

**Project Features:**
- **Bold item** with regular text
- *Italic item* with `code`
- Item with [a link](https://example.com)
  - Nested **bold** item
  - Nested item with `code snippet`

### Example 3: Code Block with Syntax Highlighting

```python
def greet(name):
    """Greet someone by name."""
    return f"Hello, {name}!"

# Usage
message = greet("Developer")
print(message)
```

```javascript
// JavaScript alternative
function greet(name) {
  return `Hello, ${name}!`;
}
```

### Example 4: Blockquote with Formatting

> **Important Note**: This blockquote contains **bold text**, *italic text*, and even `inline code`.
> 
> It can span multiple paragraphs and include all markdown features!

### Example 5: Complex Table

| Feature | Status | Description |
|---------|--------|-------------|
| **Headers** | ✅ Ready | H1 through H6 |
| **Links** | ✅ Ready | Internal and external |
| **Code** | ✅ Ready | Inline and blocks |
| **Tables** | ✅ Ready | With formatting |

### Example 6: Callout with Code

{% callout type="note" %}
**Quick Tip**: You can use code blocks inside callouts:

```javascript
const config = {
  theme: 'dark',
  language: 'en'
};
```

This makes documentation much more interactive!
{% /callout %}

### Example 7: Horizontal Rule

Content above the line.

---

Content below the line.

### Example 8: Task Lists

Here's what we need to do:

- [x] Create Markdoc guide
- [x] Add live examples
- [x] Show rendered output
- [ ] Add more advanced examples
- [ ] Create video tutorial

---

## Syntax vs Output Examples

### Emphasis and Strong

| You Type | You Get |
|----------|---------|
| `*italic*` | *italic* |
| `**bold**` | **bold** |
| `***bold italic***` | ***bold italic*** |
| `~~strikethrough~~` | ~~strikethrough~~ |

### Links

| You Type | You Get |
|----------|---------|
| `[GitHub](https://github.com)` | [GitHub](https://github.com) |
| `[Link with title](https://example.com "Hover me")` | [Link with title](https://example.com "Hover me") |

### Code

| You Type | You Get |
|----------|---------|
| `` `inline code` `` | `inline code` |
| `` `const x = 10;` `` | `const x = 10;` |

### Headings Hierarchy

```
# H1 - Page Title
## H2 - Major Section  
### H3 - Subsection
#### H4 - Sub-subsection
##### H5 - Minor heading
###### H6 - Smallest heading
```

**Renders as:**

# H1 - Page Title
## H2 - Major Section  
### H3 - Subsection
#### H4 - Sub-subsection
##### H5 - Minor heading
###### H6 - Smallest heading

---

## Real-World Example

Here's a complete example showing multiple features together:

### API Authentication Guide

{% callout type="note" %}
**Before you start**: Make sure you have your API credentials ready.
{% /callout %}

#### Step 1: Install the SDK

```bash
npm install @company/api-sdk
```

#### Step 2: Initialize the Client

```javascript
import { ApiClient } from '@company/api-sdk';

const client = new ApiClient({
  apiKey: process.env.API_KEY,
  environment: 'production'
});
```

#### Step 3: Make Your First Request

```javascript
const response = await client.users.list({
  limit: 10,
  offset: 0
});

console.log(response.data);
```

{% callout type="check" %}
✅ **Success!** You're now ready to use the API.
{% /callout %}

#### Common Issues

| Issue | Solution |
|-------|----------|
| `401 Unauthorized` | Check your API key |
| `429 Too Many Requests` | Implement rate limiting |
| `500 Server Error` | Contact support |

{% callout type="warning" %}
⚠️ **Rate Limits**: The API has a limit of **100 requests per minute**. Exceeding this will result in `429` errors.
{% /callout %}

#### Next Steps

1. Read the [full API reference](/api-docs)
2. Check out [code examples](/docs/examples)
3. Join our [developer community](https://community.example.com)

---

## Practical Use Cases

### Documentation Portal
- API references
- User guides
- Release notes
- Tutorials

### Component Libraries
- Component documentation
- Usage examples
- Props tables
- Interactive demos

### Knowledge Base
- Help articles
- FAQs
- Troubleshooting guides
- Best practices

### Product Documentation
- Feature documentation
- Integration guides
- Configuration references
- Migration guides

---

## Rendering Markdoc

### Basic Rendering Flow

1. **Parse** - Convert Markdown to AST
```javascript
const ast = Markdoc.parse(content);
```

2. **Transform** - Apply schema and generate render tree
```javascript
const content = Markdoc.transform(ast, config);
```

3. **Render** - Convert to HTML or React
```javascript
// HTML
const html = Markdoc.renderers.html(content);

// React
const reactNode = Markdoc.renderers.react(content, React, { components });
```

---

## Integration Examples

### With Next.js

```javascript
import Markdoc from '@markdoc/markdoc';
import React from 'react';

export default function Page({ content }) {
  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast, config);
  const children = Markdoc.renderers.react(transformed, React, {
    components: {
      Callout,
      CodeBlock,
      Tabs
    }
  });
  
  return <article>{children}</article>;
}
```

### With React

```javascript
import { Markdoc } from '@markdoc/markdoc';

function MarkdocRenderer({ content }) {
  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast, config);
  
  return Markdoc.renderers.react(transformed, React, {
    components: { /* your components */ }
  });
}
```

---

## 📚 Quick Reference Cheat Sheet

{% callout type="check" %}
**Bookmark this section!** Quick syntax reminders for when you need them.
{% /callout %}

### 📝 Basic Markdown

| Element | Syntax | Example |
|---------|--------|---------|
| **Headers** | `# H1` to `###### H6` | `## My Section` |
| **Bold** | `**text**` | `**important**` |
| **Italic** | `*text*` | `*emphasis*` |
| **Code** | `` `code` `` | `` `const x = 10` `` |
| **Link** | `[text](url)` | `[GitHub](https://github.com)` |
| **Image** | `![alt](src)` | `![Logo](logo.png)` |
| **List** | `- item` or `1. item` | `- First item` |
| **Quote** | `> text` | `> Important note` |

### 🏷️ Markdoc Tags

| Syntax | Purpose | Example |
|--------|---------|---------|
| `{​% tag %}...{​% /tag %}` | Container tag | `{​% callout %}text{​% /callout %}` |
| `{​% tag /%}` | Self-closing | `{​% partial file="header.md" /%}` |
| `{​% tag attr="value" %}` | With attributes | `{​% callout type="warning" %}` |
| `{​% if condition %}` | Conditional | `{​% if $isAdmin %}content{​% /if %}` |

### 🔧 Variables & Functions

| Type | Syntax | Example |
|------|--------|---------|
| **Variable** | `$name` | `$version` |
| **Nested** | `$obj.key` | `$user.email` |
| **Array** | `$arr[0]` | `$items[0]` |
| **Function** | `$func($arg)` | `$uppercase($name)` |
| **Equals** | `$equals(a, b)` | `$equals($role, "admin")` |

### 🎨 Callout Types

| Type | When to Use |
|------|-------------|
| `type="note"` | 💡 Tips, information, helpful hints |
| `type="warning"` | ⚠️ Cautions, deprecation notices |
| `type="caution"` | 🚨 Critical warnings, danger |
| `type="check"` | ✅ Success, best practices |

### 📄 Frontmatter

```yaml
---
title: Page Title
description: SEO description
author: Your Name
version: 1.0
tags: [tag1, tag2]
---
```

### 🧩 Common Patterns

```markdown
# Conditional content
{​% if $environment === "production" %}
Production API URL
{​% else /%}
Development API URL
{​% /if %}

# Reusable content
{​% partial file="header.md" variables={title: "Hello"} /%}

# Dynamic text
Welcome, $userName! Version: $version
```

---

## 🚀 Getting Started Workflow

{% callout type="note" %}
**Follow these steps** to start using Markdoc in your project:
{% /callout %}

### Step 1: Install Markdoc

```bash
npm install @markdoc/markdoc
# or
yarn add @markdoc/markdoc
```

### Step 2: Parse Your Content

```javascript
import Markdoc from '@markdoc/markdoc';

const content = '# Hello World';
const ast = Markdoc.parse(content);
```

### Step 3: Transform with Config

```javascript
const config = {
  tags: { /* your tags */ },
  variables: { /* your variables */ }
};

const transformed = Markdoc.transform(ast, config);
```

### Step 4: Render

```javascript
// For HTML
const html = Markdoc.renderers.html(transformed);

// For React
import React from 'react';
const reactNode = Markdoc.renderers.react(transformed, React, {
  components: { /* your components */ }
});
```

---

## 🔗 Resources & Links

{% callout type="check" %}
**Learn more** from these official resources:
{% /callout %}

- 📘 **Official Website**: [markdoc.dev](https://markdoc.dev)
- 💻 **GitHub Repository**: [github.com/markdoc/markdoc](https://github.com/markdoc/markdoc)
- 📖 **Full Documentation**: [markdoc.dev/docs](https://markdoc.dev/docs)
- 🎮 **Interactive Sandbox**: [markdoc.dev/sandbox](https://markdoc.dev/sandbox)
- 🎓 **Examples**: [github.com/markdoc/markdoc/tree/main/examples](https://github.com/markdoc/markdoc/tree/main/examples)

---

## 🎉 You're Ready!

{% callout type="check" %}
**Congratulations!** You now know how to use Markdoc effectively. Start creating beautiful, dynamic documentation!
{% /callout %}

**What to do next:**

1. ✅ Experiment with basic Markdown features
2. ✅ Try creating a callout with different types
3. ✅ Add some variables to your frontmatter
4. ✅ Create a reusable partial
5. ✅ Build your first complete documentation page

**Need help?** Check the [official docs](https://markdoc.dev/docs) or explore the [sandbox](https://markdoc.dev/sandbox)!

---

*Happy documenting! 📝*
- In attributes: `attr={%` `uppercase($value)` `%}`

### Annotation Syntax
- After node: `##` `Heading` `{%` `#custom-id` `%}`
- With multiple: `##` `Heading` `{%` `#id` `.class` `%}`

---

This guide covers the essential features of Markdoc. For more advanced topics and detailed API documentation, visit the [official Markdoc documentation](https://markdoc.dev/docs).
