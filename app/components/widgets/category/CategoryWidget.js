import React, {useContext, useCallback} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import {images, text, width} from '../../../constants';
import {
  getSearchClassifieds,
  getSearchCompanies,
  getSearchProducts,
  setCategoryAndGoToNavChildren,
} from '../../../redux/actions';
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
    <TouchableOpacity
      key={element.id}
      style={[styles.categoriesContainer, {width: columns ? '50%' : '100%'}]}
      onPress={() => {
        handleClick();
      }}>
      <FastImage
        style={{width: columns ? width / 2 : width, height: width / 2}}
        resizeMode="cover"
        source={{uri: element.large}}
        loadingIndicatorSource={images.logo}
      />
      {showBtn ? (
        <Button
          onPress={() => handleClick()}
          raised
          containerStyle={{width: '90%', marginBottom: 10, marginTop: 10}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={element.name}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
        />
      ) : null}
    </TouchableOpacity>
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
