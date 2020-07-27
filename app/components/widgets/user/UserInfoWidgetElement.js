import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {View} from 'react-native-animatable';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {iconSizes, text} from '../../../constants/sizes';
import {isIOS} from '../../../constants';
import Collapsible from 'react-native-collapsible';
import PropTypes from 'prop-types';

const UserInfoWidgetElement = ({
  element,
  elementName,
  iconName,
  type,
  showArrow = false,
}) => {
  return (
    <View key={element.length}>
      {element && (
        <TouchableOpacity
          hitSlop={{top: 15, bottom: 15, left: 15, right: 15}}
          style={styles.itemRow}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name={iconName}
              type={type}
              color="grey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: 10,
                paddingLeft: 10,
              }}
            />
            <Text style={styles.subTitle}>{I18n.t(elementName)}</Text>
          </View>
          {showArrow && (
            <Icon
              name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
              type="entypo"
              color="lightgrey"
              size={iconSizes.smallest}
              iconStyle={{
                paddingRight: isIOS ? 10 : 0,
                paddingLeft: isIOS ? 0 : 10,
              }}
            />
          )}
        </TouchableOpacity>
      )}
      {element && (
        <Collapsible
          collapsed={false}
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            minHeight: 35,
          }}>
          <View>
            <Text
              style={{
                textAlign: 'left',
                fontFamily: text.font,
                fontSize: text.medium,
                paddingLeft: 40,
                lineHeight: text.large,
                paddingBottom: 5,
              }}>
              {element}
            </Text>
          </View>
        </Collapsible>
      )}
    </View>
  );
};

export default UserInfoWidgetElement;

UserInfoWidgetElement.propTypes = {
  element: PropTypes.string.isRequired,
  elementName: PropTypes.string.isRequired,
  iconName: PropTypes.string,
};

const styles = StyleSheet.create({
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: isIOS ? 'left' : isRTL ? 'right' : 'left',
  },
});
