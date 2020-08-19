import React, {useContext} from 'react';
import {Linking, StyleSheet, Text, View} from 'react-native';
import {text} from '../../../constants/sizes';
import {links} from '../../../constants/links';
import {Callout} from 'react-native-maps';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import PropertiesWidget from '../classified/PropertiesWidget';
import validate from 'validate.js';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {take} from 'lodash';

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
        borderWidth: 0.5,
        flex: 1,
        padding: 10,
        borderRadius: 5,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignSelf: 'center',
      }}>
      <View style={{flexDirection: 'row', flex: 1}}>
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
      <View style={{alignSelf: 'center', alignItems: 'center'}}>
        {!validate.isEmpty(element.items) ? (
          <PropertiesWidget elements={take(element.items, 5)} />
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
    margin: 5,
  },
  logo: {
    width: 30,
    height: 30,
  },
  image: {
    width: '100%',
    maxWidth: 80,
    height: '100%',
    maxHeight: 80,
    alignSelf: 'center',
    borderRadius: 5,
  },
});
