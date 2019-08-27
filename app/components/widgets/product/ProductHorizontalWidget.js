import React from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {getSearchProducts} from '../../../redux/actions';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import ProductWidget from './../product/ProductWidget';

const ProductHorizontalWidget = ({
  elements,
  showName,
  title,
  dispatch,
  colors
}) => {
  return (
    <View style={[widgetStyles.container, {backgroundColor: '#FAFAFA'}]}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() =>
          dispatch(getSearchProducts({searchElements: {on_home: true}}))
        }>
        <View style={widgetStyles.titleWrapper}>
          <Text
            style={[
              widgetStyles.title,
              {color: colors.header_one_theme_color}
            ]}>
            {I18n.t(title)}
          </Text>
        </View>
        <Icon
          type="entypo"
          name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
          size={20}
          color={colors.header_one_theme_color}
        />
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={widgetStyles.wrapper}>
        {map(elements, (c, i) => (
          <ProductWidget
            element={c}
            showName={showName}
            key={i}
            dispatch={dispatch}
            colors={colors}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductHorizontalWidget;

ProductHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool
};
