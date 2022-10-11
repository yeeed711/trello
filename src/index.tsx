import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import App from './App';
import { darkTheme } from './theme';

const GlobalStyle = createGlobalStyle`
${reset}
* {
  box-sizing: border-box;
}

html {
  font-size: 10px;
  font-family: 'Pretendard', sans-serif;
}

body{
  background-color:${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}

a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

button {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  background-color: inherit;
}

img {
  width: 100%;
  height: auto;
}

input {
  &:focus {
    outline:none;
  }
}

.ir {
  position: absolute;
  clip: rect(0,0,0,0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow:hidden;
}

.hide {
  display: none;
}
`;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);
