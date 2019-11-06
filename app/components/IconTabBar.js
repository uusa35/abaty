import React, {useContext} from 'react';
import {View} from 'react-native';
import {text} from '../constants';
import {Icon} from 'react-native-elements';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

const IconTabBar = ({type, name, focused}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View>
      <Icon
        size={text.xlarge}
        name={name}
        type={type}
        color={focused ? colors.btn_bg_theme_color : 'lightgrey'}
      />
    </View>
  );
};

export default IconTabBar;
