import React from 'react';
import {View, Text} from 'react-native';
import {map, filter} from 'lodash';
import {Icon} from 'react-native-elements';
import {text} from './../../../constants';

const PropertiesWidget = ({elements, colors}) => {
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 10
      }}>
      {map(filter(elements, e => (e.on_home ? e : null)), (p, i) => {
        return (
          <View
            key={i}
            style={{
              alignSelf: 'center',
              justifyContent: 'space-between',
              padding: 15,
              width: '25%'
            }}>
            <Icon
              name={p.icon}
              type="font-awesome"
              size={25}
              color={colors.icon_theme_color}
            />
            <Text
              style={{
                textAlign: 'center',
                fontFamily: text.font,
                fontSize: text.small
              }}>
              {p.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: text.font,
                fontSize: text.small
              }}>
              {p.value}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default PropertiesWidget;
