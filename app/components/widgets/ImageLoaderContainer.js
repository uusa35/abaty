import React, {useState} from 'react';
import {Image} from 'react-native';
import {images} from '../../constants/images';
import PropTypes from 'prop-types';
import {isNull} from 'lodash';
// import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';

const ImageLoaderContainer = ({img, style, resizeMode = 'stretch'}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const {logo} = useSelector(state => state.settings);

  return (
    <Image
      resizeMethod={'resize'}
      source={
        imageLoading
          ? images.loading
          : {
              uri: img ? img : logo,
              // priority: FastImage.priority.high,
              // cache: FastImage.cacheControl.immutable,
            }
      }
      onLoadEnd={() => setImageLoading(false)}
      style={[
        style,
        {
          backgroundColor: 'transparent',
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
      resizeMode={resizeMode}
    />
  );
};

export default ImageLoaderContainer;

ImageLoaderContainer.propTypes = {
  img: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};
