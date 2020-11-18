import { createGlobalStyle } from 'styled-components';
import githubBackground from '../assets/img/background.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #F0F0F5 url(${githubBackground}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
  }

  body, button, input {
    font-family: 'Poppins', sans-serif;
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
    border-left: .7em solid #b70710;
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