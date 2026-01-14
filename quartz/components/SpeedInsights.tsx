import { QuartzComponent, QuartzComponentConstructor } from "./types"

/**
 * SpeedInsights component for Vercel Speed Insights integration.
 * This component injects the Speed Insights tracking script into the page.
 *
 * Speed Insights helps you measure and analyze your site's performance metrics.
 * For more information, visit: https://vercel.com/docs/speed-insights
 */
export default (() => {
  const SpeedInsights: QuartzComponent = () => {
    return (
      <>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };`,
          }}
        />
        <script defer src="/_vercel/speed-insights/script.js" />
      </>
    )
  }

  return SpeedInsights
}) satisfies QuartzComponentConstructor
