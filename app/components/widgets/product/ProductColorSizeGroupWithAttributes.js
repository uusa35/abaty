import React, {
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {iconSizes, text} from '../../../constants/sizes';
import PropTypes from 'prop-types';
import SizesModal from './SizesModal';
import ProductWidgetQtyBtns from './ProductWidgetQtyBtns';
import ColorsModal from './ColorsModal';
import {isNull, first} from 'lodash';
import {axiosInstance} from '../../../redux/actions/api';
import {addToCart} from '../../../redux/actions/cart';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {enableWarningMessage} from '../../../redux/actions';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {useDispatch, useSelector} from 'react-redux';
import WrapAsGiftWidget from './WrapAsGiftWidget';
import {EXPO} from './../../../../app';

const ProductColorSizeGroupWithAttributes = ({element}) => {
  const {colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const {settings} = useSelector((state) => state);
  const [requestQty, setRequestQty] = useState(0);
  const [productAttribute, setProductAttribute] = useState(null);
  const [sizeVisible, setSizeVisible] = useState(false);
  const [colorVisible, setColorVisible] = useState(false);
  const [colorItems, setColorItems] = useState(null);
  const [colorItem, setColorItem] = useState(null);
  const [colorName, setColorName] = useState(null);
  const [sizeItem, setSizeItem] = useState(null);
  const [notes, setNotes] = useState('');
  const [elementId, setElementId] = useState(null);
  const [wrapGift, setWrapGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

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
          params: {product_id: element.id, size_id: sizeItem.id},
        })
        .then((r) => setColorItems(r.data))
        .catch((e) => e);
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
            color_id: colorItem.id,
          },
        })
        .then((r) => setProductAttribute(r.data))
        .catch((e) => e);
    }
  }, [colorItem]);

  const handleSize = useCallback(() => {
    setSizeVisible(true);
    setRequestQty(0);
    setSizeItem(null);
    setColorItem(null);
    setColorName(null);
    setWrapGift(false);
  });

  return (
    <View
      style={{
        width: '100%',
      }}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 5,
          }}>
          <Button
            onPress={() => handleSize()}
            containerStyle={{flex: 0.45}}
            buttonStyle={{
              backgroundColor: 'whitesmoke',
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            title={isNull(sizeItem) ? I18n.t('choose_size') : sizeItem.name}
            titleStyle={{
              fontFamily: text.font,
              color: 'black',
              fontSize: text.smaller,
            }}
          />
          <Button
            onPress={() =>
              sizeItem
                ? setColorVisible(true)
                : dispatch(enableWarningMessage(I18n.t('choose_size')))
            }
            // iconRight
            // icon={
            //   <Icon
            //     name="circle"
            //     type="font-awesome"
            //     size={iconSizes.smaller}
            //     // color={colorItem ? colorItem.code : 'transparent'}
            //     color="black"
            //   />
            // }
            containerStyle={{flex: 0.45}}
            buttonStyle={{
              backgroundColor: 'whitesmoke',
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: 'lightgray',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
            title={
              isNull(colorName) ? I18n.t('choose_color_or_height') : colorName
            }
            titleStyle={{
              fontFamily: text.font,
              color: 'black',
              fontSize: text.smaller,
            }}
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
        {element.wrap_as_gift && (
          <WrapAsGiftWidget
            wrapGift={wrapGift}
            setWrapGift={setWrapGift}
            giftMessage={giftMessage}
            setGiftMessage={setGiftMessage}
            requestQty={requestQty}
            productAttribute={productAttribute}
          />
        )}
      </View>
      {element.has_stock && element.is_available && (
        <Button
          onPress={() =>
            dispatch(
              addToCart({
                wrapGift,
                directPurchase: element.directPurchase,
                product_attribute_id: productAttribute.id,
                cart_id: productAttribute.cart_id,
                product_id: productAttribute.product_id,
                qty: requestQty,
                type: 'product',
                element,
                color_id: colorItem ? colorItem.id : null,
                size_id: sizeItem ? sizeItem.id : null,
                notes: wrapGift
                  ? notes.concat(
                      `\n :: ${I18n.t('wrap_as_gift', {
                        item: settings.gift_fee,
                      })} :: \n ${giftMessage}`,
                    )
                  : notes,
              }),
            )
          }
          disabled={!productAttribute || requestQty <= 0}
          raised
          containerStyle={{width: '100%', marginTop: 10, marginBottom: 10}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={I18n.t('add_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
        />
      )}
      <View style={{width: '105%', alignSelf: 'center'}}>
        <Input
          spellCheck={true}
          placeholder={
            element.notes
              ? element.notes
              : I18n.t(
                  EXPO
                    ? 'add_notes_shoulders_height_and_other_notes_expo'
                    : 'add_notes_shoulders_height_and_other_notes',
                )
          }
          defaultValue={notes ? notes : null}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 5,
            paddingLeft: 15,
            paddingRight: 15,
            // marginTop: 5,
            height: 80,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
          }}
          disabled={!productAttribute || requestQty <= 0}
          shake={true}
          keyboardType="default"
          multiline={true}
          numberOfLines={3}
          onChangeText={(notes) => setNotes(notes)}
        />
      </View>
    </View>
  );
};

export default React.memo(ProductColorSizeGroupWithAttributes);

ProductColorSizeGroupWithAttributes.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
