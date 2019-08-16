import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import {images, text, width} from '../../../constants';
import {getSearchProducts} from '../../../redux/actions';
import {DispatchContext} from '../../../redux/DispatchContext';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CategoryWidget = ({category, columns, showBtn = false}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View>
      <TouchableOpacity
        key={category.id}
        style={[
          styles.categoriesContainer,
          // {width: columns ? 120 : width - 40, height: columns ? 250 : 300}
          {width: '100%'}
        ]}
        onPress={() =>
          dispatch(
            getSearchProducts({
              element: category,
              searchElements: {product_category_id: category.id}
            })
          )
        }>
        <FastImage
          style={{width: width, height: 400}}
          resizeMode="cover"
          source={{uri: category.large}}
          loadingIndicatorSource={images.logo}
        />
        {showBtn ? (
          <Button
            onPress={() =>
              dispatch(
                getSearchProducts({
                  element: category,
                  searchElements: {product_category_id: category.id}
                })
              )
            }
            raised
            containerStyle={{width: '70%', marginBottom: 10, marginTop: 10}}
            buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
            title={category.name}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color
            }}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(CategoryWidget);

CategoryWidget.propTypes = {
  category: PropTypes.object,
  columns: PropTypes.number
};

const styles = StyleSheet.create({
  categoriesContainer: {
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  mainCategoryBg: {
    width: '100%',
    height: '100%'
  },
  categoryName: {
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'center'
  }
});
