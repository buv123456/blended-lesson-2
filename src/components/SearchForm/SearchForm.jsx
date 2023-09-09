import { Component } from 'react';

import { FiSearch } from 'react-icons/fi';
import { FormBtn, InputSearch, SearchFormStyled } from './SearchForm.styled';

export class SearchForm extends Component {
  state = {
    query: '',
  };

  handleInput = e => {
    this.setState({ query: e.target.value.toLowerCase().trim() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.query) {
      return alert('No data!');
    }
    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <SearchFormStyled onSubmit={this.handleSubmit}>
        <FormBtn type="submit">
          <FiSearch size="16px" />
        </FormBtn>
        <InputSearch
          placeholder="What do you want to write?"
          name="search"
          required
          autoFocus
          onChange={this.handleInput}
          value={this.state.query}
        />
      </SearchFormStyled>
    );
  }
}
