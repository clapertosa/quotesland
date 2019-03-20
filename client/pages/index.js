import { typeahead } from "../store/actions/typeahead";
import styled from "styled-components";
import SearchBar from "../components/SearchBar/SearchBar";
import Quote from "../components/Quote/Quote";
import Logo from "../components/Logo/Logo";

const Wrapper = styled.div`
  display: grid;
  grid-template-areas: "logo" "searchbar" "results";
`;

const Index = () => {
  return (
    <Wrapper>
      <Logo />
      <SearchBar />
      <Quote />
    </Wrapper>
  );
};

Index.getInitialProps = ({ reduxStore, isServer }) => {
  reduxStore.dispatch(typeahead());

  return { isServer };
};

export default Index;
