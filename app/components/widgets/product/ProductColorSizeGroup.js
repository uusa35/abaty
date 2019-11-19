import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {text} from '../../../constants';
import ProductWidgetQtyBtns from './ProductWidgetQtyBtns';
import PropTypes from 'prop-types';
import {DispatchContext} from '../../../redux/DispatchContext';
import {addToCart} from '../../../redux/actions/cart';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import validate from 'validate.js';

const ProductColorSizeGroup = ({element}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const {size, color, qty, show_attribute} = element;
  [requestQty, setRequestQty] = useState(0);
  [notes, setNotes] = useState('');
  return (
    <View
      style={{
        justifyContent: 'space-around',
        width: '100%',
      }}>
      {element.show_attribute ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
          }}>
          {!validate.isEmpty(size) && show_attribute ? (
            <Button
              raised
              containerStyle={{flex: 0.4, marginBottom: 10, margin: 2}}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'black',
              }}
              title={size ? size.name : I18n.t('choose_size')}
              titleStyle={{fontFamily: text.font, color: 'black'}}
            />
          ) : null}
          {!validate.isEmpty(color) && show_attribute ? (
            <Button
              raised
              iconRight
              icon={
                <Icon
                  name="circle"
                  type="font-awesome"
                  size={25}
                  color={color.code}
                />
              }
              containerStyle={{flex: 0.4, marginBottom: 10, margin: 2}}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'black',
                justifyContent: 'space-around',
              }}
              title={color ? color.name : I18n.t('height')}
              titleStyle={{fontFamily: text.font, color: 'black'}}
            />
          ) : null}
        </View>
      ) : null}
      <ProductWidgetQtyBtns
        qty={qty}
        requestQty={requestQty}
        setRequestQty={setRequestQty}
      />
      <View>
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
            height: 80,
          }}
          inputStyle={{
            fontFamily: text.font,
            textAlign: isRTL ? 'right' : 'left',
          }}
          disabled={!qty || requestQty <= 0 ? false : true}
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
                product_attribute_id: null,
                cart_id: null,
                product_id: element.id,
                qty: requestQty,
                element,
                type: 'product',
                notes,
              }),
            )
          }
          disabled={!qty || requestQty <= 0 ? true : false}
          raised
          containerStyle={{width: '100%', marginBottom: 10, marginTop: 10}}
          buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
          title={I18n.t('add_to_cart')}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
        />
      ) : null}
    </View>
  );
};

export default ProductColorSizeGroup;

ProductColorSizeGroup.propTypes = {
  size: PropTypes.object,
  color: PropTypes.object,
};

const styles = StyleSheet.create({});
