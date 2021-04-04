import {Text, TouchableOpacity, View} from 'react-native';
import {submitAuth} from '../../../redux/actions/user';
import widgetStyles from '../widgetStyles';
import I18n from '../../../I18n';
import React, {useContext} from 'react';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import {isNull} from 'lodash';
import {themeColors} from '../../../constants/colors';

const DesingeratBtn = ({
  handleClick,
  title,
  bg = true,
  titleStyle = widgetStyles.headerThree,
  marginTop = 5,
  width = '95%',
  bgColor = null,
  disabled = false,
}) => {
  const {colors} = useSelector((state) => state.settings);
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        width,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: bg
          ? isNull(bgColor)
            ? colors.btn_bg_theme_color
            : bgColor
          : 'transparent',
        height: 50,
        borderRadius: 3,
        marginTop,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
        elevation: 1,
      }}
      onPress={() => handleClick()}>
      <Text
        style={[
          titleStyle,
          {
            color: bg
              ? colors.btn_text_theme_color
              : colors.header_one_theme_color,
            textAlign: 'center',
            paddingTop: 5,
          },
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default DesingeratBtn;

DesingeratBtn.prototype = {
  title: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  titleStyle: PropTypes.object,
};
