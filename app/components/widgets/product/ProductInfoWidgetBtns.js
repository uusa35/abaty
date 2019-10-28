import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {text, width} from '../../../constants';
import PropTypes from 'prop-types';
import {Button, Icon, ButtonGroup, Divider} from 'react-native-elements';
import I18n from '../../../I18n';
import {DispatchContext} from '../../../redux/DispatchContext';
import ProductColorSizeGroup from './ProductColorSizeGroup';
import ProductColorSizeGroupWithAttributes from './ProductColorSizeGroupWithAttributes';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductInfoWidgetBtns = ({element}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Divider color="lightgrey" style={{width: '100%'}} />
        {element.has_attributes ? (
          <Text
            style={{
              fontFamily: text.font,
              color: colors.normal_text_theme_color,
              textAlign: 'center',
              paddingTop: 10,
              fontSize: 15,
            }}>
            {I18n.t('sizes_and_colors_and_length_available')}
          </Text>
        ) : null}
      </View>
      {element.has_attributes ? (
        <ProductColorSizeGroupWithAttributes element={element} />
      ) : (
        <ProductColorSizeGroup element={element} />
      )}
      {!element.has_stock ? (
        <Button
          raised
          containerStyle={{width: '100%', marginBottom: 10}}
          buttonStyle={{backgroundColor: 'red'}}
          title={I18n.t('out_of_stock')}
          titleStyle={{fontFamily: text.font, color: 'white'}}
        />
      ) : null}
    </View>
  );
};

export default ProductInfoWidgetBtns;

ProductInfoWidgetBtns.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
