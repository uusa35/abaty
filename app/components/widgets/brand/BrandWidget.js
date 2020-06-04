import React, {useContext} from 'react';
import widgetStyles from '../widgetStyles';
import {getSearchProducts} from '../../../redux/actions/product';
import FastImage from 'react-native-fast-image';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {touchOpacity} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {useDispatch} from 'react-redux';

const BrandWidget = ({
  element,
  showName = false,
  currentWidth = 100,
  currentMarginBottom = 0,
}) => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      activeOpacity={touchOpacity}
      key={element.id}
      style={[
        widgetStyles.btnStyle,
        {
          width: currentWidth,
          marginLeft: 2,
          marginRight: 2,
          marginBottom: currentMarginBottom,
          borderWidth: 0.5,
          borderRadius: 20,
          borderColor: 'lightgrey',
        },
      ]}
      onPress={() => {
        dispatch({type: 'SET_BRAND', payload: element});
        dispatch(
          getSearchProducts({
            name: element.name,
            searchParams: {brand_id: element.id},
            redirect: true,
          }),
        );
      }}>
      <FastImage
        source={{
          uri: element.thumb,
          priority: FastImage.priority.normal,
        }}
        loadingIndicatorSource={images.logo}
        style={styles.image}
        resizeMode="cover"
      />
      {showName ? (
        <Text style={widgetStyles.elementName}>{element.name}</Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default BrandWidget;

BrandWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
