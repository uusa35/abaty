import React, {useContext} from 'react';
import {Linking, StyleSheet, Text, View, Image} from 'react-native';
import {text} from '../../../constants/sizes';
import {links} from '../../../constants/links';
import {Callout} from 'react-native-maps';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import PropertiesWidget from '../classified/PropertiesWidget';
import validate from 'validate.js';
import ImageLoaderContainer from '../ImageLoaderContainer';

const CallOutView = ({
  latitude,
  longitude,
  image,
  title,
  address,
  price,
  description,
  element,
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
        alignItems: 'flex-start',
      }}>
      <View style={{flexDirection: 'row'}}>
        <ImageLoaderContainer
          style={styles.image}
          img={image}
          resizeMode="cover"
        />
        <View
          style={{flexWrap: 'nowrap', flexDirection: 'column', padding: 10}}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'baseline',
              justifyContent: 'flex-start',
            }}>
            {title ? (
              <Text style={styles.title}>{title.substring(0, 50)}</Text>
            ) : null}
            {address ? (
              <Text style={styles.title}>{address.substring(0, 50)}</Text>
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
        {!validate.isEmpty(element.items) && (
          <PropertiesWidget elements={element.items} />
        )}
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
    margin: 5,
  },
  logo: {
    width: 30,
    height: 30,
  },
  image: {
    width: 80,
    height: 100,
  },
});
