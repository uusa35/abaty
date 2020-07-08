import React, {useState, useContext} from 'react';
import {Image} from 'react-native';
import {images} from '../../constants/images';
import PropTypes from 'prop-types';
import {isNull} from 'lodash';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const ImageLoaderContainer = ({img, style, resizeMode = 'stretch'}) => {
  const [imageLoading, setImageLoading] = useState(true);
  const {logo} = useContext(GlobalValuesContext);

  return (
    <Image
      source={
        imageLoading && !isNull(img)
          ? images.loadingSm
          : {uri: img ? img : logo, cache: 'force-cache'}
      }
      onLoadEnd={() => setImageLoading(false)}
      style={[style, {backgroundColor: 'transparent'}]}
      resizeMode={imageLoading ? 'contain' : resizeMode}
    />
  );
};

export default React.memo(ImageLoaderContainer);

ImageLoaderContainer.propTypes = {
  img: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired,
};
