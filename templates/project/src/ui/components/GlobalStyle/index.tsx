import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${preval`
    module.exports = require('fs').readFileSync('node_modules/reset-css/reset.css', 'utf-8');
  `}

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    overscroll-behavior-y: none;
  }

  html {
    box-sizing: border-box;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,Helvetica, Arial,sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
    font-size: 10px;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    -webkit-text-size-adjust: 100%;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0;
    text-shadow: none;
    color: #000000;
    background-color: #ffffff;
  }

  img {
    display: inline-block;
    height: auto;
    max-width: 100%;
    vertical-align: middle;
  }

  ::selection {
    color: #ffffff;
    background-color: #282b35;
  }

  a {
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    font-style: inherit;
    color: inherit;
    text-decoration: inherit;
  }

  p {
    font-size: 1.6rem;
  }

  h1 {
    margin-bottom: 20px;
    font-size: 2.4rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.8rem;
  }

  #app {
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    color: #181c1f;
    background-color: #f9ddab;
    overflow: hidden;
  }
`;

export default GlobalStyle;
