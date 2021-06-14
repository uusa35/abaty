/**
 * Created by usamaahmed on 9/28/17.
 */
import React, {useContext} from 'react';
import {StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  useNavigation,
  TabActions,
  DrawerActions,
} from '@react-navigation/native';
import {clearCart} from '../redux/actions/cart';
import {useDispatch} from 'react-redux';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {iconSizes} from '../constants/sizes';
import {isRTL} from './../I18n';

export const HeaderBack = ({removeCart = false}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleBack = () => {
    if (removeCart) {
      dispatch(clearCart());
      navigation.navigate('CartTab');
    } else {
      navigation.goBack();
    }
  };

  return (
    <Icon
      type="fontawesome"
      name={isRTL ? 'chevron-right' : 'chevron-left'}
      size={iconSizes.small}
      // onPress={() => handleBack()}
      onPress={() => handleBack()}
      underlayColor="transparent"
      hitSlop={{
        top: iconSizes.medium,
        bottom: iconSizes.medium,
        left: iconSizes.medium,
        right: iconSizes.medium,
      }}
      color={colors.footer_theme_color}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '150%',
  },
});
