import React, {useContext} from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {getSearchProducts} from '../../../redux/actions/product';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import ProductWidget from './../product/ProductWidget';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductHorizontalWidget = ({
  elements,
  showName,
  title,
  showLink = true,
}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={[widgetStyles.container, {backgroundColor: 'transparent'}]}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() =>
          showLink
            ? dispatch(
                getSearchProducts({
                  searchParams: {on_home: true},
                  redirect: true,
                }),
              )
            : null
        }>
        <View style={widgetStyles.titleWrapper}>
          <Text
            style={[
              widgetStyles.title,
              {color: colors.header_one_theme_color},
            ]}>
            {title}
          </Text>
        </View>
        {showLink ? (
          <Icon
            type="entypo"
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            size={20}
            color={colors.header_one_theme_color}
          />
        ) : null}
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={widgetStyles.wrapper}>
        {map(elements, (c, i) => (
          <ProductWidget element={c} showName={showName} key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default ProductHorizontalWidget;

ProductHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool,
};
