import React, {useContext} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {Button} from 'react-native-elements';
import {text, touchOpacity, width} from '../../../constants/sizes';
import {setCategoryAndGoToNavChildren} from '../../../redux/actions/category';
import {getSearchProducts} from '../../../redux/actions/product';
import {getSearchClassifieds} from '../../../redux/actions/classified';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {useDispatch} from 'react-redux';
import {ABATI} from './../../../../app';

const CategoryWidget = ({element, columns, showBtn = false, type}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = (c) => {
    switch (type) {
      case 'product':
        dispatch(
          getSearchProducts({
            name: c.name,
            searchParams: {product_category_id: c.id},
            redirect: true,
          }),
        );
        break;
      case 'company':
        dispatch(setCategoryAndGoToNavChildren(c));
        break;
      case 'classified':
        dispatch(
          getSearchClassifieds({
            name: c.name,
            searchParams: {classified_category_id: element.id},
            redirect: true,
          }),
        );
        break;
      default:
        null;
    }
  };

  return (
    <View
      key={element.id}
      animation="pulse"
      easing="ease-out"
      useNativeDriver={true}
      style={[
        styles.categoriesContainer,
        {width: columns ? '50%' : '100%', paddingBottom: 10},
      ]}>
      <TouchableOpacity
        activeOpacity={touchOpacity}
        // style={{ backgroundColor : 'blue'}}
        onPress={() => {
          handleClick(element);
        }}>
        <ImageLoaderContainer
          style={{
            width: columns ? width / 2 : width,
            height: columns ? width / 2 : width / 1.5,
            marginBottom: '1%',
          }}
          resizeMode="stretch"
          img={element.thumb}
        />
        {(showBtn && element.is_featured) || ABATI ? (
          <Button
            onPress={() => handleClick(element)}
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
              fontSize: text.small,
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
    // alignItems: 'center',
    // backgroundColor: 'white',
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
