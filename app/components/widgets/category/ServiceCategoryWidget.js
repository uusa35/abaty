import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Button} from 'react-native-elements';
import {text, width} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {getSearchServices} from '../../../redux/actions/service';
import PropTypes from 'prop-types';

const ServiceCategoryWidget = ({
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
            getSearchServices({
              name: element.name,
              searchParams: {service_category_id: element.id},
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
                getSearchServices({
                  name: element.name,
                  searchElements: {service_category_id: element.id},
                  redirect: true,
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

export default ServiceCategoryWidget;

ServiceCategoryWidget.propTypes = {
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
