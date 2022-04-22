import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ largeImageURL, webformatURL, tags, onClick }) => {
  return (
    <li className={s.item} onClick={() => onClick(largeImageURL)}>
      <img className={s.itemImage} src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default ImageGalleryItem;
