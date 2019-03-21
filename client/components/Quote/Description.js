import styled from "styled-components";

const Container = styled.div`
  grid-area: description;
  display: grid;
  grid-template-areas: "title" "extract" "source";
  margin-top: 30px;
  overflow: auto;
  animation: fade 1s;

  h1 {
    grid-area: title;
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Title = styled.h1`
  margin: 0;
  padding: 0;
  text-align: center;
  font-size: 1.5rem;
  color: #6d6875;
`;

const Extract = styled.div`
  margin-top: 10px;
`;

const Source = styled.div`
  text-align: right;

  a {
    color: #6d6875;
  }
`;

const Description = ({ extract, source }) => {
  if (extract) {
    return (
      <Container>
        <Title>Description</Title>
        <Extract>{extract}</Extract>
        <Source>
          <a href={source} rel="noopener noreferrer" target="_blank">
            Wikipedia
          </a>
        </Source>
      </Container>
    );
  } else return null;
};

export default Description;
