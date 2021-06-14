import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {iconSizes, text, touchOpacity} from '../../../constants/sizes';
import I18n, {isRTL} from '../../../I18n';
import {View} from 'react-native-animatable';
import {Icon} from 'react-native-elements';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import widgetStyles from '../widgetStyles';

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
      activeOpacity={touchOpacity}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        paddingTop: 10,
        paddingBottom: 10,
      }}
      onPress={link}>
      {elementName && (
        <Text style={widgetStyles.headerFour}>{I18n.t(elementName)}</Text>
      )}
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {name && <Text style={widgetStyles.headerFour}>{name}</Text>}
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
            size={iconSizes.smallest}
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
