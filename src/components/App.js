import React, { Component } from 'react';
import Container from './Container/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import imagesApi from '../api/images-api';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';
import './App.css';

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    page: 1,
    perPage: 12,
    error: null,
    isLoading: false,
    isModalOpen: false,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchQuery !== this.state.searchQuery) {
      this.fetchImgs();
    }
  }

  changeQuery = query => {
    this.setState({
      searchQuery: query,
      page: 1,
      images: [],
      error: null,
    });
  };

  fetchImgs = () => {
    const { searchQuery, page, perPage } = this.state;
    const options = { searchQuery, page, perPage };
    this.setState({ isLoading: true });

    imagesApi
      .getImages(options)
      .then(images => {
        if (images.length === 0) {
          toast.error('Sorry, nothing found.', {
            position: toast.POSITION.TOP_RIGHT,
            theme: 'light',
            autoclose: '1000',
          });
        }

        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ isLoading: false }));
  };

  onLoadButtonClick = () => {
    this.fetchImgs();
  };

  toggleModal = largeImageURL => {
    this.setState(({ isModalOpen }) => ({
      isModalOpen: !isModalOpen,
      largeImageURL,
    }));
  };

  render() {
    const { images, error, isLoading, isModalOpen, largeImageURL } = this.state;
    const renderLoadMoreButton = images.length > 0 && !isLoading;
    return (
      <div>
        {error && <h1>{toast.error(error.message)}</h1>}

        <Searchbar onSubmit={this.changeQuery} />
        <Container>{isLoading && <Loader />}</Container>

        <ImageGallery images={images} onClick={this.toggleModal} />
        {isModalOpen && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="img" />
          </Modal>
        )}

        <Container>
          {renderLoadMoreButton && <Button onClick={this.onLoadButtonClick} />}
        </Container>
        <ToastContainer />
      </div>
    );
  }
}

export default App;
