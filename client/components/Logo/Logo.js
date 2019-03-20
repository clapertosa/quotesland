import styled from "styled-components";

const Container = styled.div`
  grid-area: logo;
  margin: auto;
  max-width: 200px;
  width: 100%;
  height: auto;

  img {
    width: 100%;
    height: auto;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    max-width: 200px;
    width: 100%;
    height: auto;
  }
`;

const Logo = () => {
  return (
    <Container>
      <img
        src="/static/quote.svg"
        alt="Quotesland logo: colored apexes in a circle background"
      />
    </Container>
  );
};

export default Logo;
