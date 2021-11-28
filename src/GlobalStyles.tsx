import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  html, body {
    height: 100vh;
  }
  
  body {
    margin: 0;
    padding: 0;
  
    font-size: 18px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  
    background-color: hsl(40, 9%, 87%);
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
  
  #root {
    min-height: 100%;
    isolation: isolate;
  }

  dl {
    display: grid;
    grid-template: auto / max-content max-content;
    grid-gap: 0 1rem;
  }
  
  dl dt {
    font-weight: bold;
  }
  
  dl dd {
    margin :0;
  }

  :root {
    --shadow-color: 30deg 2% 60%;
    --shadow-elevation-low:
      -0.3px 0.2px 0.3px hsl(var(--shadow-color) / 0.55),
      -0.4px 0.3px 0.4px -2.5px hsl(var(--shadow-color) / 0.37),
      -1px 0.9px 1px -5px hsl(var(--shadow-color) / 0.18);
    --shadow-elevation-medium:
      -0.3px 0.2px 0.3px hsl(var(--shadow-color) / 0.58),
      -0.5px 0.4px 0.5px -1.7px hsl(var(--shadow-color) / 0.44),
      -1.8px 1.5px 1.8px -3.3px hsl(var(--shadow-color) / 0.29),
      -5.2px 4.4px 5.1px -5px hsl(var(--shadow-color) / 0.15);
    --shadow-elevation-high:
      -0.3px 0.2px 0.3px hsl(var(--shadow-color) / 0.54),
      -0.4px 0.3px 0.4px -0.7px hsl(var(--shadow-color) / 0.47),
      -0.8px 0.7px 0.8px -1.4px hsl(var(--shadow-color) / 0.4),
      -2.1px 1.8px 2.1px -2.1px hsl(var(--shadow-color) / 0.34),
      -4.6px 3.9px 4.5px -2.9px hsl(var(--shadow-color) / 0.27),
      -8.7px 7.4px 8.6px -3.6px hsl(var(--shadow-color) / 0.2),
      -14.8px 12.6px 14.6px -4.3px hsl(var(--shadow-color) / 0.13),
      -23.4px 19.8px 23px -5px hsl(var(--shadow-color) / 0.07);
  }
`

export default GlobalStyles