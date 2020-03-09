import React, {useContext} from 'react';
import {text} from '../constants';
import {Icon} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import {iconSizes} from '../constatns/sizes';

const IconTabBar = ({type, name, focused}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Icon
      size={iconSizes.medium}
      name={name}
      type={type}
      color={focused ? colors.icon_theme_color : colors.main_theme_color}
    />
  );
};

export default IconTabBar;
