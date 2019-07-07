import React, {useState, useMemo, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import I18n from '../../../I18n';
import {text} from '../../../constants';
import PropTypes from 'prop-types';
import SizesModal from './SizesModal';
import ProductWidgetQtyBtns from './ProductWidgetQtyBtns';
import ColorsModal from './ColorsModal';
import {isNull, first} from 'lodash';
import {axiosInstance} from '../../../redux/actions/api';
import {DispatchContext} from '../../../redux/DispatchContext';
import {addToCart} from '../../../redux/actions';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductColorSizeGroupWithAttributes = ({element}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  [requestQty, setRequestQty] = useState(0);
  [productAttribute, setProductAttribute] = useState(null);
  [sizeVisible, setSizeVisible] = useState(false);
  [colorVisible, setColorVisible] = useState(false);
  [colorItems, setColorItems] = useState(null);
  [colorItem, setColorItem] = useState(null);
  [sizeItem, setSizeItem] = useState(null);

  useMemo(() => {
    if (sizeVisible) {
      setRequestQty(0);
      setSizeItem(null);
      setColorItem(null);
      setColorVisible(false);
    }
  }, [sizeVisible]);

  useMemo(() => {
    if (!isNull(sizeItem)) {
      return axiosInstance
        .get('color/list', {
          params: {product_id: element.id, size_id: sizeItem.id}
        })
        .then(r => setColorItems(r.data))
        .catch(e => console.log('the e', e));
    }
  }, [sizeItem]);

  useMemo(() => {
    setColorItem(first(colorItems));
  }, [colorItems]);

  useMemo(() => {
    if (colorItem) {
      return axiosInstance
        .get('attribute/qty', {
          params: {
            product_id: element.id,
            size_id: sizeItem.id,
            color_id: colorItem.id
          }
        })
        .then(r => setProductAttribute(r.data))
        .catch(e => console.log(e));
    }
  }, [colorItem]);

  return (
    <View
      style={{
        justifyContent: 'space-around',
        width: '100%'
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around'
          }}>
          <Button
            onPress={() => setSizeVisible(true)}
            raised
            containerStyle={{flex: 0.4, marginBottom: 10, margin: 2}}
            buttonStyle={{
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: 'black'
            }}
            title={isNull(sizeItem) ? I18n.t('choose_size') : sizeItem.name}
            titleStyle={{fontFamily: text.font, color: 'black'}}
          />
          <Button
            onPress={() => setColorVisible(true)}
            raised
            iconRight
            icon={
              <Icon
                name="circle"
                type="font-awesome"
                size={25}
                color={colorItem ? colorItem.code : 'transparent'}
              />
            }
            containerStyle={{flex: 0.4, marginBottom: 10, margin: 2}}
            buttonStyle={{
              backgroundColor: 'white',
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: 'black',
              justifyContent: 'space-around'
            }}
            title={I18n.t('choose_color')}
            titleStyle={{fontFamily: text.font, color: 'black'}}
          />
        </View>
        <ProductWidgetQtyBtns
          qty={productAttribute ? productAttribute.qty : 0}
          requestQty={requestQty}
          setRequestQty={setRequestQty}
        />
        <SizesModal
          sizes={element.sizes}
          sizeVisible={sizeVisible}
          setSizeVisible={setSizeVisible}
          sizeItem={sizeItem}
          setSizeItem={setSizeItem}
        />
        <ColorsModal
          colorItems={colorItems}
          colorItem={colorItem}
          setColorItem={setColorItem}
          colorVisible={colorVisible}
          setColorVisible={setColorVisible}
        />
      </View>
      {element.has_stock && element.is_available ? (
        <Button
          onPress={() =>
            dispatch(
              addToCart({
                product_attribute_id: productAttribute.id,
                cart_id: productAttribute.cart_id,
                product_id: productAttribute.product_id,
                qty: requestQty,
                element
              })
            )
          }
          disabled={!productAttribute || requestQty <= 0 ? true : false}
          raised
          containerStyle={{width: '100%', marginBottom: 10, marginTop: 10}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={I18n.t('add_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
        />
      ) : null}
    </View>
  );
};

export default React.memo(ProductColorSizeGroupWithAttributes);

ProductColorSizeGroupWithAttributes.propTypes = {
  element: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
