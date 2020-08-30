import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import ProductInfoWidgetMainTitle from './ProductInfoWidgetMainTitle';
import ProductInfoWidgetBtns from './ProductInfoWidgetBtns';
import {Button} from 'react-native-elements';
import I18n from './../../../I18n';
import {text} from '../../../constants/sizes';

const ProductInfoWidget = ({element}) => {
  return (
    <View
      useNativeDriver={true}
      animation="bounceInLeft"
      easing="ease-out"
      contentContainerStyle={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      }}>
      <ProductInfoWidgetMainTitle element={element} />
      {element.directPurchase && (
        <Button
          title={I18n.t('you_can_add_more_than_one_product_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            fontSize: text.medium,
            fontWeight: 'bold',
          }}
          buttonStyle={{backgroundColor: 'red'}}
          containerStyle={{width: '95%', alignSelf: 'center'}}
        />
      )}
      {element.show_attribute && <ProductInfoWidgetBtns element={element} />}
    </View>
  );
};

export default ProductInfoWidget;

ProductInfoWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
