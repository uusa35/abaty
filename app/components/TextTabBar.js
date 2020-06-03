import React, {useContext} from 'react';
import {text} from '../constants/sizes';
import {Text} from 'react-native';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

const TextTabBar = ({focused, title}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <Text
      style={{
        fontFamily: text.font,
        fontSize: text.smaller,
        textAlign: 'center',
        color: focused ? colors.icon_theme_color : colors.btn_bg_theme_color,
      }}>
      {title}
    </Text>
  );
};

export default TextTabBar;
