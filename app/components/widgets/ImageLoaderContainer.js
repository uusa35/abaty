import React, {useState} from 'react';
import {Image} from 'react-native';
import {images} from '../../constants/images';
import PropTypes from 'prop-types';

const ImageLoaderContainer = ({img, style, resizeMode = 'stretch'}) => {
  const [imageLoading, setImageLoading] = useState(true);
  return (
    <Image
      source={imageLoading ? images.loadingSm : {uri: img}}
      onLoadEnd={() => setImageLoading(false)}
      style={[style, {backgroundColor: 'white'}]}
      resizeMode={imageLoading ? 'contain' : resizeMode}
    />
  );
};
export default ImageLoaderContainer;

ImageLoaderContainer.propTypes = {
  img: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};
