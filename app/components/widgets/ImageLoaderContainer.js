import React, {useState, useContext} from 'react';
import {Image} from 'react-native';
import {images} from '../../constants/images';
import PropTypes from 'prop-types';
import {isNull} from 'lodash';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import FastImage from 'react-native-fast-image';

const ImageLoaderContainer = ({img, style, resizeMode = 'stretch'}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const {logo} = useContext(GlobalValuesContext);

  return (
    <Image
      source={
        imageLoading && !isNull(img)
          ? images.loadingSm
          : {uri: img ? img : logo, cache: 'force-cache'}
        // : {uri: img ? img : logo, cache: 'cacheOnly'}
      }
      onLoadEnd={() => setImageLoading(false)}
      style={[style, {backgroundColor: 'transparent'}]}
      resizeMode={imageLoading ? 'center' : resizeMode}
    />
  );
};

export default ImageLoaderContainer;

ImageLoaderContainer.propTypes = {
  img: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};
