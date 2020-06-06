import React, {useState} from 'react';
import {Image} from 'react-native';
import {images} from '../../constants/images';
import PropTypes from 'prop-types';
import {isNull} from 'lodash';

const ImageLoaderContainer = ({img, style, resizeMode = 'stretch'}) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <Image
      source={imageLoading && !isNull(img) ? images.loadingSm : {uri: img}}
      onLoadEnd={() => setImageLoading(false)}
      style={[style, {backgroundColor: 'white'}]}
      resizeMode={imageLoading ? 'contain' : resizeMode}
    />
  );
};
export default React.memo(ImageLoaderContainer);

ImageLoaderContainer.propTypes = {
  img: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};
