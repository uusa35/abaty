import React from 'react';
import {View, Text} from 'react-native';
import {map, take} from 'lodash';
import {iconSizes, text} from './../../../constants/sizes';
import ImageLoaderContainer from '../ImageLoaderContainer';

const PropertiesWidget = ({elements}) => {
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
        borderWidth: 0.5,
      }}>
      {map(
        elements,
        (item, i) =>
          item.on_home && (
            <View
              key={i}
              style={{
                borderLeftWidth: 0.5,
                borderColor: 'lightgrey',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
                alignSelf: 'center',
                padding: 10,
                width: '25%',
                // minHeight: 85,
              }}>
              <ImageLoaderContainer
                img={item.categoryGroup.thumb}
                style={{
                  width: iconSizes.smaller,
                  height: iconSizes.smaller,
                  marginBottom: 5,
                }}
              />
              {/*<Icon*/}
              {/*  name={item.categoryGroup.icon}*/}
              {/*  type="font-awesome"*/}
              {/*  size={25}*/}
              {/*  color={colors.icon_theme_color}*/}
              {/*/>*/}
              {/*<Text*/}
              {/*  style={{*/}
              {/*    textAlign: 'center',*/}
              {/*    fontFamily: text.font,*/}
              {/*    fontSize: text.smaller,*/}
              {/*  }}>*/}
              {/*  {item.categoryGroup.name}*/}
              {/*</Text>*/}

              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: text.font,
                  fontSize: text.smaller,
                }}>
                {item.categoryGroup.is_multi
                  ? item.property.name
                  : item.property.value}
              </Text>
            </View>
          ),
      )}
    </View>
  );
};

export default PropertiesWidget;
