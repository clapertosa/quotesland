import styled from "styled-components";
import { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  mediaQueryMinWidth: "40rem"
};

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: Montserrat;
  src: url('../../../static/Montserrat-Regular.ttf');
}

@font-face {
  font-family: Courgette;
  src: url('../../../static/Courgette-Regular.ttf');
}

html, body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffcdb2;
  font-family: Montserrat;
}

*, *:before, *:after {
  box-sizing: inherit;
  }
`;

const Container = styled.div`
  width: 90%;
  margin: 10px auto auto auto;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    width: 60%;
  }
`;

const Layout = props => {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Container>{props.children}</Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
