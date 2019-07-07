import React, {useState, useContext, useMemo} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import I18n from '../../../I18n';
import {text} from '../../../constants';
import ProductWidgetQtyBtns from './ProductWidgetQtyBtns';
import PropTypes from 'prop-types';
import {DispatchContext} from '../../../redux/DispatchContext';
import {addToCart} from '../../../redux/actions';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductColorSizeGroup = ({element}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const {size, color, qty} = element;
  [requestQty, setRequestQty] = useState(0);
  return (
    <View
      style={{
        justifyContent: 'space-around',
        width: '100%'
      }}>
      {element.show_attribute ? (
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around'
          }}>
          {size ? (
            <Button
              raised
              containerStyle={{flex: 0.4, marginBottom: 10, margin: 2}}
              buttonStyle={{
                backgroundColor: 'white',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'black'
              }}
              title={size ? size.name : I18n.t('choose_size')}
              titleStyle={{fontFamily: text.font, color: 'black'}}
            />
          ) : null}
          {color ? (
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
                justifyContent: 'space-around'
              }}
              title={I18n.t('color')}
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
      {element.has_stock && element.is_available ? (
        <Button
          onPress={() =>
            dispatch(
              addToCart({
                product_attribute_id: null,
                cart_id: null,
                product_id: element.id,
                qty: requestQty,
                element
              })
            )
          }
          disabled={!qty || requestQty <= 0 ? true : false}
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

export default React.memo(ProductColorSizeGroup);

ProductColorSizeGroup.propTypes = {
  size: PropTypes.object,
  color: PropTypes.object
};

const styles = StyleSheet.create({});
