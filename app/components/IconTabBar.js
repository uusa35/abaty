import React, {useContext} from 'react';
import {View} from 'react-native';
import {Icon, Badge} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {iconSizes} from '../constants/sizes';
import {EXPO, HOMEKEY, ESCRAP} from './../../app';

const IconTabBar = ({type, name, focused, showLabel = false}) => {
  const {colors, cartLength} = useContext(GlobalValuesContext);
  return (
    <View>
      <Icon
        size={showLabel ? iconSizes.small : iconSizes.small}
        name={name}
        type={type}
        color={focused ? colors.icon_theme_color : colors.btn_bg_theme_color}
        containerStyle={{
          padding: EXPO || HOMEKEY || ESCRAP ? 10 : 0,
          borderBottomWidth: focused && (EXPO || HOMEKEY || ESCRAP) ? 2 : 0,
          borderColor: focused ? colors.btn_bg_theme_color : 'transparent',
        }}
      />
      {cartLength > 0 && name === 'cart-arrow-down' && (
        <Badge
          status="error"
          value={cartLength}
          containerStyle={{position: 'absolute', top: 5, right: -4}}
        />
      )}
    </View>
  );
};

export default IconTabBar;
