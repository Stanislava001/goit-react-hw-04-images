import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { IoIosSearch } from 'react-icons/io';
import s from './Searchbar.module.css';

class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { query } = this.state;
    if (query === '') {
      toast.info('Type what you are looking for.', {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'light',
        autoclose: '2500',
      });
    }
    this.props.onSubmit(query);
    this.setState({ query: '' });
  };

  render() {
    const { query } = this.state;
    return (
      <header className={s.searchbar}>
        <form onSubmit={this.handleSubmit} className={s.searchForm}>
          <button type="submit" className={s.searchFormButton}>
            {/* <span className={s.searchFormButtonLabel}>Search</span> */}
            <IoIosSearch
              style={{
                margin: '0',
                width: '30',
                height: '30',
              }}
            />
          </button>

          <input
            onChange={this.handleChange}
            className={s.searchFormInput}
            value={query}
            name="request"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
