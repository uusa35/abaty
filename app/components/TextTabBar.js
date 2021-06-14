import React, {useContext, Fragment} from 'react';
import {text} from '../constants/sizes';
import {Text} from 'react-native';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';

const TextTabBar = ({focused, title, showLabel = false}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <>
      {showLabel && (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.small,
            textAlign: 'center',
            color: focused
              ? colors.btn_bg_theme_color
              : colors.footer_theme_color,
          }}>
          {title}
        </Text>
      )}
    </>
  );
};

export default TextTabBar;
