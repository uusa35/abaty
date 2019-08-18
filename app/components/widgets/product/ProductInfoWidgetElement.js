import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {isIOS, text} from '../../../constants';
import I18n, {isRTL} from '../../../I18n';
import {View} from 'react-native-animatable';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ProductInfoWidgetElement = ({
  link,
  elementName,
  name,
  showArrow = true
}) => {
  const {colors} = useContext(GlobalValuesContext);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingTop: 10,
        paddingBottom: 10
      }}
      onPress={link}>
      <Text
        style={{
          textAlign: 'left',
          fontSize: 20,
          fontFamily: text.font,
          color: colors.header_one_theme_color
        }}>
        {I18n.t(elementName)}
      </Text>
      <View style={{flexDirection: 'row'}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: 15,
            fontFamily: text.font,
            paddingLeft: 10,
            paddingRight: 10
          }}>
          {name}
        </Text>
        {showArrow ? (
          <Icon
            name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
            type="entypo"
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
  showArrow: PropTypes.bool
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    textAlign: 'left'
  }
});
