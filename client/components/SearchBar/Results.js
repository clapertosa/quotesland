import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 105px;
  width: 100%;
  background-color: #ffb4a2;
  border: 2px solid #6d6875;
  border-radius: 15px;
  overflow: auto;

  @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
      mediaQueryMinWidth}) {
    top: 75px;
  }
`;

const List = styled.ul`
  padding: 0;

  li {
    list-style-type: none;
    padding: 4px 10px 4px 10px;
    font-size: 2rem;
    text-align: center;

    @media (min-width: ${({ theme: { mediaQueryMinWidth } }) =>
        mediaQueryMinWidth}) {
      font-size: 1.3rem;
    }
  }
`;

const ListItem = styled.li`
  cursor: pointer;
  list-style-type: none;
  padding: 4px 10px 4px 10px;
  text-align: center;
  transition: background-color 0.3s;

  &:hover,
  &:focus {
    background-color: #e5989b;
  }
`;

const Results = ({ authorSelected, show, authors, query, loading }) => {
  if (show && authors.length > 0 && query.trim().length > 0 && !loading) {
    let filteredAuthors = authors.filter(author => {
      const regexStr = "(?=.*" + query.split(" ").join(")(?=.*") + ")";
      const searchRegex = new RegExp(regexStr, "gi");
      return author.name.match(searchRegex) !== null;
    });

    const select = (e, name, count) => {
      const resultsLength = document.querySelectorAll("li[tabindex]").length;
      if (e.which === 40) {
        e.target.tabIndex < resultsLength - 1
          ? document
              .querySelector(`li[tabindex="${e.target.tabIndex + 1}"]`)
              .focus()
          : document.querySelector("li[tabindex='0']").focus();
      } else if (e.which === 38) {
        e.target.tabIndex > 0
          ? document
              .querySelector(`li[tabindex="${e.target.tabIndex - 1}"]`)
              .focus()
          : document
              .querySelector(`li[tabindex='${resultsLength - 1}']`)
              .focus();
      } else if (e.which === 13) {
        authorSelected(name, count);
      }
    };

    return (
      <Container id="results">
        <List>
          {filteredAuthors.length > 0 ? (
            filteredAuthors
              .map((author, index) => (
                <ListItem
                  key={author.permalink}
                  tabIndex={index}
                  onClick={() => authorSelected(author.name, author.count)}
                  onKeyDown={e => select(e, author.name, author.count)}
                >
                  {author.name} ({author.count} quotes)
                </ListItem>
              ))
              .slice(0, 10)
          ) : (
            <li>Sorry, no results 🤕</li>
          )}
        </List>
      </Container>
    );
  }

  return null;
};

export default Results;
