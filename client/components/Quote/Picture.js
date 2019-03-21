import styled from "styled-components";

const Container = styled.div`
  grid-area: picture;
  margin: auto;
  animation: fade 1s;
  max-width: 200px;

  img {
    width: 100%;
    height: auto;
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

const Picture = ({ image, name }) => {
  if (image) {
    return (
      <Container>
        <img src={image} alt={name} />
      </Container>
    );
  } else return null;
};

export default Picture;
