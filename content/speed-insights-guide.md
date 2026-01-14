---
title: Getting started with Speed Insights
description: Guide for implementing Vercel Speed Insights in your project
---

This guide will help you get started with using Vercel Speed Insights on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed. If you don't have it, you can install it using the following command:

For pnpm:

```bash
pnpm i vercel
```

For yarn:

```bash
yarn i vercel
```

For npm:

```bash
npm i vercel
```

For bun:

```bash
bun i vercel
```

## Enable Speed Insights in Vercel

On the [Vercel dashboard](/dashboard), select your Project followed by the **Speed Insights** tab. You can also select the button below to be taken there. Then, select **Enable** from the dialog.

> **Note:** Enabling Speed Insights will add new routes (scoped at `/_vercel/speed-insights/*`) after your next deployment.

## Add `@vercel/speed-insights` to your project

Using the package manager of your choice, add the `@vercel/speed-insights` package to your project:

For pnpm:

```bash
pnpm i @vercel/speed-insights
```

For yarn:

```bash
yarn i @vercel/speed-insights
```

For npm:

```bash
npm i @vercel/speed-insights
```

For bun:

```bash
bun i @vercel/speed-insights
```

## Integration by Framework

### Next.js (Pages Router)

The `SpeedInsights` component is a wrapper around the tracking script, offering more seamless integration with Next.js.

Add the following component to your main app file:

```ts filename="pages/_app.tsx"
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
```

```js filename="pages/_app.jsx"
import { SpeedInsights } from "@vercel/speed-insights/next"

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  )
}

export default MyApp
```

For versions of Next.js older than 13.5, import the `<SpeedInsights>` component from `@vercel/speed-insights/react`. Then pass it the pathname of the route, as shown below:

```tsx filename="pages/example-component.tsx"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { useRouter } from "next/router"

export default function Layout() {
  const router = useRouter()

  return <SpeedInsights route={router.pathname} />
}
```

### Next.js (App Router)

Add the following component to the root layout:

```tsx filename="app/layout.tsx"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

```jsx filename="app/layout.jsx"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
```

For versions of Next.js older than 13.5, create a dedicated component to avoid opting out from SSR on the layout:

```tsx filename="app/insights.tsx"
"use client"

import { SpeedInsights } from "@vercel/speed-insights/react"
import { usePathname } from "next/navigation"

export function Insights() {
  const pathname = usePathname()

  return <SpeedInsights route={pathname} />
}
```

Then, import the `Insights` component in your layout:

```tsx filename="app/layout.tsx"
import type { ReactNode } from "react"
import { Insights } from "./insights"

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Insights />
      </body>
    </html>
  )
}
```

### React (Create React App)

Add the following component to the main app file:

```tsx filename="App.tsx"
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function App() {
  return (
    <div>
      {/* ... */}
      <SpeedInsights />
    </div>
  )
}
```

### Remix

Add the following component to your root file:

```ts filename="app/root.tsx"
import { SpeedInsights } from '@vercel/speed-insights/remix';

export default function App() {
  return (
    <html lang="en">
      <body>
        {/* ... */}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### SvelteKit

Add the following code to your root layout file:

```ts filename="src/routes/+layout.ts"
import { injectSpeedInsights } from "@vercel/speed-insights/sveltekit"

injectSpeedInsights()
```

### HTML

Add the following scripts before the closing tag of the `<body>`:

```html filename="index.html"
<script>
  window.si =
    window.si ||
    function () {
      ;(window.siq = window.siq || []).push(arguments)
    }
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

### Vue

Add the following component to the main app template:

```vue filename="src/App.vue"
<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue"
</script>

<template>
  <SpeedInsights />
</template>
```

### Nuxt

Add the following component to the default layout:

```vue filename="layouts/default.vue"
<script setup lang="ts">
import { SpeedInsights } from "@vercel/speed-insights/vue"
</script>

<template>
  <SpeedInsights />
</template>
```

### Other Frameworks

Import the `injectSpeedInsights` function from the package, which will add the tracking script to your app. **This should only be called once in your app, and must run in the client**.

```ts filename="main.ts"
import { injectSpeedInsights } from "@vercel/speed-insights"

injectSpeedInsights()
```

### Astro

Speed Insights is available for both static and SSR Astro apps.

To enable this feature, declare the `<SpeedInsights />` component from `@vercel/speed-insights/astro` near the bottom of one of your layout components:

```tsx filename="BaseHead.astro"
---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<SpeedInsights />
```

Optionally, you can remove sensitive information from the URL by adding a `speedInsightsBeforeSend` function to the global `window` object:

```tsx filename="BaseHead.astro"
---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<script is:inline>
  function speedInsightsBeforeSend(data){
    console.log("Speed Insights before send", data)
    return data;
  }
</script>
<SpeedInsights />
```

Learn more about `beforeSend` in the [package documentation](/docs/speed-insights/package#beforesend).

## Deploy your app to Vercel

You can deploy your app to Vercel's global CDN by running the following command from your terminal:

```bash
vercel deploy
```

Alternatively, you can [connect your project's git repository](/docs/git#deploying-a-git-repository), which will enable Vercel to deploy your latest pushes and merges to main.

Once your app is deployed, it's ready to begin tracking performance metrics.

> **Note:** If everything is set up correctly, you should be able to find the `/_vercel/speed-insights/script.js` script inside the body tag of your page.

## View your data in the dashboard

Once your app is deployed, and users have visited your site, you can view the data in the dashboard.

To do so, go to your [dashboard](/dashboard), select your project, and click the **Speed Insights** tab.

After a few days of visitors, you'll be able to start exploring your metrics. For more information on how to use Speed Insights, see [Using Speed Insights](/docs/speed-insights/using-speed-insights).

Learn more about how Vercel supports [privacy and data compliance standards](/docs/speed-insights/privacy-policy) with Vercel Speed Insights.

## Next steps

Now that you have Vercel Speed Insights set up, you can explore the following topics to learn more:

- [Learn how to use the `@vercel/speed-insights` package](/docs/speed-insights/package)
- [Learn about metrics](/docs/speed-insights/metrics)
- [Read about privacy and compliance](/docs/speed-insights/privacy-policy)
- [Explore pricing](/docs/speed-insights/limits-and-pricing)
- [Troubleshooting](/docs/speed-insights/troubleshooting)
