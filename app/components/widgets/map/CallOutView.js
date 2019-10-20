import React, {useContext} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {links, text} from '../../../constants';
import FastImage from 'react-native-fast-image';
import {Callout} from 'react-native-maps';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import PropertiesWidget from '../classified/PropertiesWidget';
import validate from 'validate.js';

const CallOutView = ({
  latitude,
  longitude,
  image,
  title,
  price,
  description,
  element
}) => {
  const {currency_symbol} = useContext(GlobalValuesContext);
  return (
    <Callout
      onPress={() =>
        Linking.openURL(`${links.googleMapUrl}${latitude},${longitude}`)
      }
      style={{
        width: 250,
        borderWidth: 0.5,
        padding: 10,
        borderRadius: 10,
        borderColor: 'lightgrey',
        minHeight: 120,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}>
      <View style={{flexDirection: 'row'}}>
        <FastImage
          style={styles.image}
          source={{uri: image}}
          resizeMode="contain"
        />
        <View
          style={{flexWrap: 'nowrap', flexDirection: 'column', padding: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'baseline',
              justifyContent: 'flex-start'
            }}>
            {title ? (
              <Text style={styles.title}>{title.substring(0, 50)}</Text>
            ) : null}
            {price ? (
              <Text style={styles.title}>
                {price} {currency_symbol}
              </Text>
            ) : null}
            {description ? (
              <Text style={styles.title}>{description.substring(0, 50)}</Text>
            ) : null}
          </View>
        </View>
      </View>
      <View>
        {!validate.isEmpty(element.items) ? (
          <PropertiesWidget elements={element.items} />
        ) : null}
      </View>
    </Callout>
  );
};

export default CallOutView;

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.small,
    textAlign: 'left',
    margin: 5
  },
  logo: {
    width: 30,
    height: 30
  },
  image: {
    width: 80,
    height: 100
  }
});
