import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {text} from '../../../constants';
import I18n, {isRTL} from '../../../I18n';
import {View} from 'react-native-animatable';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';

const ClassifiedInfoWidgetElement = ({
  link,
  elementName,
  name,
  showIcon = true,
  translate = true,
  iconName = null,
  colors,
}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingTop: 10,
        paddingBottom: 10,
      }}
      onPress={link}>
      <Text
        style={{
          textAlign: 'left',
          fontSize: text.medium,
          fontFamily: text.font,
          color: colors.header_one_theme_color,
        }}>
        {translate ? I18n.t(elementName) : elementName}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            fontFamily: text.font,
            paddingLeft: 10,
            paddingRight: 10,
          }}>
          {name}
        </Text>
        {showIcon ? (
          <Icon
            name={
              isRTL
                ? iconName
                  ? iconName
                  : 'chevron-thin-left'
                : iconName
                ? iconName
                : 'chevron-thin-right'
            }
            type={iconName ? 'font-awesome' : 'entypo'}
            color={colors.header_one_theme_color}
            size={15}
            iconStyle={{}}
          />
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default ClassifiedInfoWidgetElement;

ClassifiedInfoWidgetElement.propTypes = {
  elementName: PropTypes.string.isRequired,
  // name : PropTypes.string,
  link: PropTypes.func,
  showArrow: PropTypes.bool,
  colors: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
});
