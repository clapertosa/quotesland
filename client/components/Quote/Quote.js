import { connect } from "react-redux";
import { getAuthor } from "../../store/actions/author";
import styled from "styled-components";
import Picture from "./Picture";
import Description from "./Description";
import Spinner from "../Spinner/Spinner";

const Container = styled.div`
  display: grid;
  grid-area: quote;
  grid-template-columns: auto;
  grid-template-rows: 1fr auto auto;
  grid-template-areas: "picture" "quotearea" "description";
  margin: 20px auto 20px auto;
  padding: 20px;
  border: 2px solid #b5838d;
  border-radius: 10px;
`;

const QuoteArea = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-template-rows: auto 1fr;
  grid-template-areas: "body body body" "author author author";
  grid-area: quotearea;

  blockquote {
    grid-area: body;
    text-align: center;
    font-family: Courgette;
    font-size: 1.5rem;

    span {
      animation: fade 1s;

      @keyframes fade {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    }
  }

  div {
    grid-area: author;
    text-align: right;
    font-weight: bold;

    img {
      width: 200px;
      height: auto;
    }
  }
`;

const Quote = ({ quote, author }) => {
  if (author.loading) {
    return <Spinner />;
  } else if (author.success) {
    return (
      <Container>
        <Picture image={author.data.image} name={author.data.signature} />
        <QuoteArea>
          <blockquote>
            {quote.success ? <span>{quote.data.body}</span> : <Spinner />}
          </blockquote>
          <div>
            {author.data.signatureImage ? (
              <img
                src={author.data.signatureImage}
                alt={`${author.data.signature} signature`}
              />
            ) : (
              <span>{author.data.signature}</span>
            )}
          </div>
        </QuoteArea>
        <Description
          extract={author.data.extract}
          source={author.data.pageUrl}
        />
      </Container>
    );
  }
  return null;
};

const mapStateToProps = state => {
  return {
    quote: state.quote,
    author: state.author
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthor: name => dispatch(getAuthor(name))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quote);
