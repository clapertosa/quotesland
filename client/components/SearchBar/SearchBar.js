import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { search } from "../../store/actions/quote";
import { typeahead } from "../../store/actions/typeahead";
import { getAuthor } from "../../store/actions/author";
import Results from "./Results";

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  grid-area: searchbar;
`;

const Search = styled.input`
  outline: none;
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  border: 2px solid #b5838d;
  border-radius: 100px;
  padding: 10px;
  font-weight: bold;
  font-size: 2rem;

  &:placeholder-shown {
    color: #6d6875;
    font-size: 2rem;

    @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
        mediaQueryMinWidth}) {
      font-size: 1.3rem;
    }
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    font-size: 1.3rem;
    height: 70px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #ffb4a2;
  margin: 10px;
  padding: 10px;
  font-size: 2rem;
  font-weight: bold;
  border: 2px solid #6d6875;
  border-radius: 50px;
  transition: background-color 0.3s;

  &:hover,
  &:focus {
    background-color: #e5989b;
  }

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    font-size: 1.2rem;
  }
`;

const SearchBar = ({ typeahead, author, getAuthors, getAuthor, search }) => {
  const [query, setQuery] = useState("");
  const [quotesNumber, setQuotesNumber] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const onChangeHandler = e => {
    setQuery(e.target.value);
    setShowResults(true);
    if (!typeahead.loading && !typeahead.success) {
      getAuthors();
    }
  };

  const onAuthorSelect = (authorName, authorQuotes) => {
    setQuery(authorName);
    setQuotesNumber(authorQuotes);
    setShowResults(false);
    search(authorName, authorQuotes);
    getAuthor(authorName);
  };

  const getAnotherQuote = () => {
    search(query, quotesNumber);
  };

  return (
    <Container>
      <Search
        type="text"
        placeholder="Type author's name: William Shakespeare"
        value={query}
        onFocus={() => setShowResults(true)}
        onClick={() => setShowResults(true)}
        onChange={onChangeHandler}
        onKeyDown={e => {
          if (typeahead.authors.length > 0 && e.which === 40) {
            const result = document.querySelector('li[tabindex="0"]');
            result ? result.focus() : null;
          } else if (typeahead.authors.length > 0 && e.which === 38) {
            const result = document.querySelector(
              `li[tabindex="${document.querySelectorAll("li[tabindex]").length -
                1}"]`
            );
            result ? result.focus() : null;
          } else if (e.which === 27) {
            setShowResults(false);
          }
        }}
      />
      {(query.trim().length > 0 && author.success) || author.success ? (
        <Button onClick={getAnotherQuote}>Another Quote</Button>
      ) : null}
      <Results
        authorSelected={onAuthorSelect}
        show={showResults}
        authors={typeahead.authors}
        query={query}
        loading={typeahead.loading}
      />
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    typeahead: state.typeahead,
    author: state.author
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthors: () => dispatch(typeahead()),
    getAuthor: name => dispatch(getAuthor(name)),
    search: (author, quotes) => dispatch(search(author, quotes))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBar);
