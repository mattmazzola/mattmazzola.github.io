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
`

export default GlobalStyles