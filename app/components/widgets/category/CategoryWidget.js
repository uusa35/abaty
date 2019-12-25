import React, {useContext, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import {images, text, touchOpacity, width} from '../../../constants';
import {setCategoryAndGoToNavChildren} from '../../../redux/actions/category';
import {getSearchProducts} from '../../../redux/actions/product';
import {getSearchClassifieds} from '../../../redux/actions/classified';
import PropTypes from 'prop-types';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CategoryWidget = ({element, columns, showBtn = false, type}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = useCallback(() => {
    switch (type) {
      case 'product':
        return dispatch(
          getSearchProducts({
            name: element.name,
            searchParams: {product_category_id: element.id},
            redirect: true,
          }),
        );
      case 'company':
        return dispatch(setCategoryAndGoToNavChildren(element));
      case 'classified':
        return dispatch(
          getSearchClassifieds({
            name: element.name,
            searchParams: {classified_category_id: element.id},
            redirect: true,
          }),
        );
    }
  });

  return (
    <View
      key={element.id}
      animation="pulse"
      easing="ease-out"
      style={[styles.categoriesContainer, {width: columns ? '50%' : '100%'}]}>
      <TouchableOpacity
        activeOpacity={touchOpacity}
        onPress={() => {
          handleClick();
        }}>
        <FastImage
          style={{width: columns ? width / 2 : width, height: width / 2}}
          resizeMode="cover"
          source={{uri: element.thumb}}
          loadingIndicatorSource={images.logo}
        />
        {showBtn ? (
          <Button
            onPress={() => handleClick()}
            raised
            containerStyle={{
              marginBottom: 10,
              marginTop: 10,
              marginRight: 10,
              marginLeft: 10,
            }}
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

export default CategoryWidget;

CategoryWidget.propTypes = {
  element: PropTypes.object,
  columns: PropTypes.number,
  type: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  categoriesContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
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
