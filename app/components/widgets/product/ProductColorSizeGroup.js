import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {iconSizes, text} from '../../../constants/sizes';
import ProductWidgetQtyBtns from './ProductWidgetQtyBtns';
import PropTypes from 'prop-types';
import {addToCart} from '../../../redux/actions/cart';
import validate from 'validate.js';
import {useDispatch, useSelector} from 'react-redux';
import WrapAsGiftWidget from './WrapAsGiftWidget';
import {EXPO} from './../../../../app';

const ProductColorSizeGroup = ({element}) => {
  const {settings} = useSelector((state) => state);
  const {colors} = settings;
  const dispatch = useDispatch();
  const {size, color, qty, show_attribute} = element;
  const [requestQty, setRequestQty] = useState(0);
  const [notes, setNotes] = useState('');
  const [wrapGift, setWrapGift] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  return (
    <View
      style={{
        width: '100%',
      }}>
      {element.show_attribute && (
        <View
          style={{
            flexDirection: 'row',
            // width: '100%',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          {!validate.isEmpty(size) && show_attribute && (
            <Button
              containerStyle={{flex: 0.4}}
              buttonStyle={{
                backgroundColor: 'whitesmoke',
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
              title={size ? size.name : I18n.t('choose_size')}
              titleStyle={{
                fontFamily: text.font,
                color: 'black',
                fontSize: text.smaller,
              }}
            />
          )}
          {!validate.isEmpty(color) && show_attribute && (
            <Button
              iconRight
              icon={
                <Icon
                  name="circle"
                  type="font-awesome"
                  size={25}
                  color={color.code}
                />
              }
              containerStyle={{flex: 0.4}}
              buttonStyle={{
                backgroundColor: 'whitesmoke',
                borderRadius: 5,
                borderWidth: 0.5,
                borderColor: 'lightgray',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}
              title={color ? color.name : I18n.t('height')}
              titleStyle={{
                fontFamily: text.font,
                color: 'black',
                fontSize: text.smaller,
              }}
            />
          )}
        </View>
      )}
      <ProductWidgetQtyBtns
        qty={qty}
        requestQty={requestQty}
        setRequestQty={setRequestQty}
      />
      {element.wrap_as_gift && (
        <WrapAsGiftWidget
          wrapGift={element.wrap_as_gift}
          setWrapGift={setWrapGift}
          giftMessage={giftMessage}
          setGiftMessage={setGiftMessage}
          requestQty={requestQty}
          productAttribute={null}
        />
      )}
      <View style={{width: '100%', alignSelf: 'center', marginTop: 5}}>
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
          containerStyle={{flex: 1}}
          inputContainerStyle={{
            borderWidth: 0.5,
            borderColor: colors.btn_bg_theme_color,
            borderRadius: iconSizes.tiny,
            paddingLeft: 10,
            paddingRight: 10,
            height: 80,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
          }}
          defaultValue={notes ? notes : null}
          disabled={!qty || requestQty <= 0}
          shake={true}
          keyboardType="default"
          multiline={true}
          numberOfLines={3}
          onChangeText={(notes) => setNotes(notes)}
        />
      </View>
      {element.has_stock && element.is_available && (
        <Button
          onPress={() =>
            dispatch(
              addToCart({
                product_attribute_id: null,
                cart_id: null,
                product_id: element.id,
                qty: requestQty,
                element,
                type: 'product',
                wrapGift,
                directPurchase: element.directPurchase,
                notes: wrapGift
                  ? notes.concat(
                      `\n :: (${I18n.t('wrap_as_gift', {
                        item: settings.gift_fee,
                      })}) :: \n ${giftMessage}`,
                    )
                  : notes,
              }),
            )
          }
          disabled={!qty || requestQty <= 0}
          raised
          containerStyle={{width: '100%'}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={I18n.t('add_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
        />
      )}
    </View>
  );
};

export default React.memo(ProductColorSizeGroup);

ProductColorSizeGroup.propTypes = {
  size: PropTypes.object,
  color: PropTypes.object,
};

const styles = StyleSheet.create({});
