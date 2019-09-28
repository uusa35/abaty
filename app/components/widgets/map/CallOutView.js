import React, {useContext} from 'react';
import {Linking, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {links, text} from '../../../constants';
import FastImage from 'react-native-fast-image';
import {Callout} from 'react-native-maps';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const CallOutView = ({
  latitude,
  longitude,
  image,
  title,
  price,
  description
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
        borderRadius: 10,
        borderColor: 'lightgrey',
        minHeight: 100,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}>
      <TouchableOpacity style={{flexDirection: 'row'}}>
        <FastImage
          style={styles.image}
          source={{uri: image}}
          resizeMode="contain"
        />
        <View>
          <View
            style={{
              width: 170,
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}>
            {title ? <Text style={styles.title}>{title}</Text> : null}
            {price ? (
              <Text style={styles.title}>
                {price} {currency_symbol}
              </Text>
            ) : null}
          </View>
          {description ? <Text style={styles.title}>{description}</Text> : null}
        </View>
      </TouchableOpacity>
    </Callout>
  );
};

export default CallOutView;

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
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
