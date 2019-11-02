import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {text} from '../../../constants';
import I18n, {isRTL} from '../../../I18n';
import {View} from 'react-native-animatable';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductInfoWidgetElement = ({
  link,
  elementName,
  name,
  iconName = null,
  showIcon = true,
}) => {
  const {colors} = useContext(GlobalValuesContext);
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
        {I18n.t(elementName)}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: text.medium,
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

export default ProductInfoWidgetElement;

ProductInfoWidgetElement.propTypes = {
  elementName: PropTypes.string.isRequired,
  // name : PropTypes.string,
  link: PropTypes.func,
  showArrow: PropTypes.bool,
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left',
  },
});
