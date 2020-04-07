import {Icon} from 'react-native-elements';
import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';
import {productWidget} from '../../../constants/sizes';

const ProductCreateCollectionWidget = ({element, width, height}) => {
  return (
    <ImageBackground
      source={{uri: element.thumb}}
      style={{
        width,
        height,
        // margin : 1,
        borderWidth: 0.5,
        borderColor: 'lightgrey',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
      }}>
      <Icon
        type="antdesign"
        name="closecircle"
        iconStyle={{
          color: 'white',
          opacity: 1,
        }}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
      />
      <Icon
        type="antdesign"
        name="checkcircleo"
        iconStyle={{
          color: 'white',
          opacity: 1,
        }}
        hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
      />
    </ImageBackground>
  );
};

export default ProductCreateCollectionWidget;

ProductCreateCollectionWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
