import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {Button, Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {enableWarningMessage} from '../../../redux/actions';
import I18n from '../../../I18n';
import {useDispatch, useSelector} from 'react-redux';

const ProductWidgetQtyBtns = ({qty, requestQty = 0, setRequestQty}) => {
  const dispatch = useDispatch();
  const {colors} = useSelector((state) => state.settings);
  return (
    <View
      style={{
        flexDirection: 'row',
        alignSelf: 'center',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: colors.btn_bg_theme_color,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 5,
        padding: 10,
      }}>
      <Button
        onPress={() =>
          requestQty >= 0 && requestQty < qty
            ? setRequestQty(requestQty + 1)
            : dispatch(
                enableWarningMessage(I18n.t('choose_size_or_exceed_limit')),
              )
        }
        icon={<Icon name="plus" type="antdesign" size={15} color="black" />}
        containerStyle={{width: '15%', margin: 5}}
        buttonStyle={{
          backgroundColor: 'white',
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: colors.btn_bg_theme_color,
          justifyContent: 'space-around',
          height: 40,
        }}
      />
      <View
        style={{
          width: '20%',
          borderWidth: 0.5,
          borderColor: colors.btn_bg_theme_color,
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 5,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 17, color: 'white'}}>{requestQty}</Text>
      </View>
      <Button
        onPress={() => (requestQty > 0 ? setRequestQty(requestQty - 1) : null)}
        icon={<Icon name="minus" type="antdesign" size={15} color="black" />}
        containerStyle={{width: '15%', margin: 5}}
        buttonStyle={{
          backgroundColor: 'white',
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: colors.btn_bg_theme_color,
          justifyContent: 'space-around',
          height: 40,
        }}
      />
    </View>
  );
};

export default ProductWidgetQtyBtns;

ProductWidgetQtyBtns.propTypes = {
  qty: PropTypes.number.isRequired,
  requestQty: PropTypes.number.isRequired,
  setRequestQty: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({});
