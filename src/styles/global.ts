import { createGlobalStyle, DefaultTheme } from 'styled-components';

interface IBodyProps extends DefaultTheme {
  theme: {
    body: string;
    text: string;
    title: string;
    background: string;
  };
}

export default createGlobalStyle<IBodyProps>`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background:${({ theme }) => theme.background};
    -webkit-font-smoothing: antialiased;
  }

  body, button, input {
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6, strong {
    color: ${({ theme }) => theme.title};
  }

  p, span, a {
    color: ${({ theme }) => theme.text};
  }

  button {
    cursor: pointer;
  }

  @keyframes load8 {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  div.loader {
    z-index: 9999;
    position: fixed;
    top: calc(50% - 4em);
    left: calc(50% - 4em);
    width: 8em;
    height: 8em;
    border: .7em solid rgba(0, 0, 0, 0.2);
    border-left: .7em solid #8bb03e;
    border-radius: 50%;
    animation: load8 1.1s infinite linear;
    transition: opacity 0.3s;
  }

  div.loading {
    margin: 24px auto 0;
    width: 2.6em;
    height: 2.6em;
    border: .4em solid rgba(0, 0, 0, 0.2);
    border-left: .4em solid #8bb03e;
    border-radius: 50%;
    animation: load8 1.1s infinite linear;
    transition: opacity 0.3s;
  }

`;
