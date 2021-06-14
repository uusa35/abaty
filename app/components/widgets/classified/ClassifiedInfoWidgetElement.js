import React, {useContext} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {text, touchOpacity} from '../../../constants/sizes';
import I18n, {isRTL} from '../../../I18n';
import {View} from 'react-native-animatable';
import {Icon, Button} from 'react-native-elements';
import PropTypes from 'prop-types';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {map} from 'lodash';

const ClassifiedInfoWidgetElement = ({
  link,
  elementName,
  name,
  showIcon = true,
  translate = true,
  iconName = null,
  properties = null,
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
      <View style={{flexDirection: 'column'}}>
        <Text
          style={{
            textAlign: 'left',
            fontSize: text.medium,
            fontFamily: text.font,
            color: colors.header_one_theme_color,
          }}>
          {translate ? I18n.t(elementName) : elementName}
        </Text>
        {properties && (
          <View style={{flexDirection: 'row', paddingTop: 10}}>
            {map(properties, p => (
              <Text
                style={{
                  backgroundColor: 'whitesmoke',
                  margin: 2,
                  minWidth: 50,
                  justifyContent: 'center',
                  alignItems: 'baseline',
                  borderRadius: 3,
                  borderWidth: 1,
                  padding: 5,
                  textAlign: 'center',
                  fontFamily: text.font,
                  fontSize: text.small,
                }}
                solid
                key={p.id}>{`${p.name}`}</Text>
            ))}
          </View>
        )}
      </View>
      {!properties ? (
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
      ) : null}
    </TouchableOpacity>
  );
};

export default ClassifiedInfoWidgetElement;

ClassifiedInfoWidgetElement.propTypes = {
  elementName: PropTypes.string.isRequired,
  // name : PropTypes.string,
  link: PropTypes.func,
  showArrow: PropTypes.bool,
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
});
