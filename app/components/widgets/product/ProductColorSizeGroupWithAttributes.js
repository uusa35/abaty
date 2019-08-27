import React, {useState, useMemo, useContext, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
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
  [colorName, setColorName] = useState(null);
  [sizeItem, setSizeItem] = useState(null);
  [notes, setNotes] = useState('');
  [elementId, setElementId] = useState(null);

  useMemo(() => {
    if (sizeVisible) {
      setElementId(element.id);
      setRequestQty(0);
      setSizeItem(null);
      setColorItem(null);
      setColorVisible(false);
    }
  }, [sizeVisible]);

  useEffect(() => {
    if (element.id !== elementId && !isNull(elementId)) {
      setRequestQty(0);
      setProductAttribute(null);
      setColorItems(null);
      setSizeItem(null);
    }
  }, [element]);

  useMemo(() => {
    if (!isNull(sizeItem)) {
      return axiosInstance
        .get('color/list', {
          params: {product_id: element.id, size_id: sizeItem.id}
        })
        .then(r => setColorItems(r.data))
        .catch(e => e);
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
            iconRight
            icon={
              <Icon
                name="circle"
                type="font-awesome"
                size={25}
                // color={colorItem ? colorItem.code : 'transparent'}
                color="black"
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
            title={
              isNull(colorName) ? I18n.t('choose_color_or_height') : colorName
            }
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
          setColorName={setColorName}
          colorVisible={colorVisible}
          setColorVisible={setColorVisible}
        />
        <Input
          spellCheck={true}
          placeholder={
            notes ? notes : I18n.t('add_notes_shoulders_height_and_other_notes')
          }
          value={notes ? notes : null}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 5,
            paddingLeft: 15,
            paddingRight: 15,
            marginTop: 5,
            height: 80
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left'
          }}
          editable={!productAttribute || requestQty <= 0 ? false : true}
          shake={true}
          keyboardType="default"
          multiline={true}
          numberOfLines={3}
          onChangeText={notes => setNotes(notes)}
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
                type: 'product',
                element,
                notes
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

export default ProductColorSizeGroupWithAttributes;

ProductColorSizeGroupWithAttributes.propTypes = {
  element: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
