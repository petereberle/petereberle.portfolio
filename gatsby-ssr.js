import * as React from "react"

import themeColorSets from "./src/theme/theme-colorset"

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })

  setHeadComponents([
    <style type="text/css"
      key="style"
      dangerouslySetInnerHTML={{
      __html:
     
      `:root { 

        --theme-background-primary: ${themeColorSets.primary};
        --theme-background-secondary: ${themeColorSets.secondary};
        --theme-border-color: ${themeColorSets.border_color};
        --theme-text-color: ${themeColorSets.text_color};

      }`

     }}
    />,
    <link
      rel="preload"
      href="/fonts/Proxima_Nova.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="font"
    />,
    <link
      rel="preload"
      href="/fonts/Proxima_Nova_Semibold.ttf"
      as="font"
      type="font/ttf"
      crossOrigin="anonymous"
      key="font"
    />,
    <link
      rel="preload"
      href="/fonts/Montserrat_Regular.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
      key="font"
    />,
    <link
      rel="preload"
      href="/fonts/Montserrat_Thin.woff"
      as="font"
      type="font/woff"
      crossOrigin="anonymous"
      key="font"
    />,
    <link
      rel="preload"
      href="/fonts/LFT_Etica_Mono.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="font"
    />,
     <link
      rel="preload"
      href="/fonts/LFT_Etica_Book.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="font"
    />,
     <link
      rel="preload"
      href="/fonts/LFT_Etica_Semibold.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="font"
    />,
      <link
      rel="preload"
      href="/fonts/LFT_Etica_Bold.otf"
      as="font"
      type="font/otf"
      crossOrigin="anonymous"
      key="font"
    />,

  ])

}