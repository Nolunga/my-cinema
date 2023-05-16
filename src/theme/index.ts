import type { ThemeConfig } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'
import type { Styles } from '@chakra-ui/theme-tools'

const colors = {
  background: '#F4F4F4',
  softPrimary: '#FBF0EF',
  softYellow: '#FDECCA',
  text: '#2A2A2A',
  siteText: '#727272'
}

const config: ThemeConfig = {
  useSystemColorMode: false
}

const fonts = {
  body: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  heading: `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`
}

const styles: Styles = {
  global: (props) => ({
    'html, body': {
      lineHeight: 1.5,
      letterSpacing: 'normal',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      fontFeatureSettings: `"liga", "kern" 1`,
      fontKerning: 'normal',
      textRendering: 'optimizeLegibility'
    },
    'ul, li': {
      listStyleType: 'none'
    }
  })
}

export default extendTheme({
  colors,
  config,
  fonts,
  styles
})
