import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import {map, filter} from 'lodash';
import {Icon} from 'react-native-elements';
import {text} from './../../../constants';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const PropertiesWidget = ({elements}) => {
  const {colors} = useContext(GlobalValuesContext);
  console.log('items', elements);
  return (
    <View
      style={{
        width: '100%',
        backgroundColor: 'white',
        opacity: 0.7,
        flexDirection: 'row',
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5
      }}>
      {map(elements, (item, i) => {
        return (
          <View
            key={i}
            style={{
              borderLeftWidth: 0.5,
              borderColor: 'lightgrey',
              justifyContent: 'center',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'center',
              padding: 10,
              width: '25%',
              minHeight: 85
            }}>
            <Icon
              name={item.categoryGroup.icon}
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
              {item.categoryGroup.name}
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: text.font,
                fontSize: text.small
              }}>
              {item.property.value}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default PropertiesWidget;
