import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import {text, width} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {getSearchProducts} from '../../../redux/actions/product';
import PropTypes from 'prop-types';

const ProductCategoryWidget = ({
  element,
  columns,
  showBtn = false,
  dispatch,
  colors,
}) => {
  return (
    <View>
      <TouchableOpacity
        key={element.id}
        style={[styles.categoriesContainer, {width: '100%'}]}
        onPress={() =>
          dispatch(
            getSearchProducts({
              name: element.name,
              searchParams: {product_category_id: element.id},
              redirect: true,
            }),
          )
        }>
        <FastImage
          style={{width: width, height: 400}}
          resizeMode="cover"
          source={{uri: element.large}}
          loadingIndicatorSource={images.logo}
        />
        {showBtn ? (
          <Button
            onPress={() =>
              dispatch(
                getSearchProducts({
                  name: element.name,
                  searchElements: {product_category_id: element.id},
                }),
              )
            }
            raised
            containerStyle={{width: '70%', marginBottom: 10, marginTop: 10}}
            buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
            title={element.name}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default ProductCategoryWidget;

ProductCategoryWidget.propTypes = {
  element: PropTypes.object,
  columns: PropTypes.number,
};

const styles = StyleSheet.create({
  categoriesContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mainCategoryBg: {
    width: '100%',
    height: '100%',
  },
  categoryName: {
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'center',
  },
});
