import React, {useContext} from 'react';
import {Linking, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Callout,
  CalloutSubview
} from 'react-native-maps';
import {width, text, links, images} from '../../constants';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const MapViewWidget = ({
  longitude,
  latitude,
  height,
  customWidth,
  logo,
  showTitle = false,
  showCallOut = true,
  title = null,
  image = null,
  description = null,
  price = ''
}) => {
  const {colors} = useContext(GlobalValuesContext);
  console.log('price', price);
  return (
    <View style={{flex: 1, marginTop: 25}}>
      {showTitle ? (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.large,
            marginBottom: 10,
            textAlign: 'left',
            color: colors.header_one_theme_color,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1
          }}>
          {I18n.t('location')}
        </Text>
      ) : null}
      <MapView
        style={{
          width: width ? width : customWidth,
          alignSelf: 'center',
          height: height ? height : '25%'
        }}
        title={title}
        zoomEnabled={true}
        // cacheEnabled={true}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.08,
          longitudeDelta: 0.08
        }}>
        <Marker
          title={title}
          onPress={() => console.log('here')}
          scrollEnabled={false}
          image={images.pin}
          opacity={1}
          coordinate={{
            latitude: latitude,
            longitude: longitude
          }}>
          {showCallOut && image ? (
            <Callout
              style={{
                width: 250,
                borderWidth: 0.5,
                borderColor: 'lightgrey',
                minHeight: 100,
                justifyContent: 'flex-start',
                alignItems: 'center'
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() =>
                  Linking.openURL(
                    `${links.googleMapUrl}${latitude},${longitude}`
                  )
                }>
                <FastImage
                  style={styles.image}
                  source={{uri: image}}
                  resizeMode="contain"
                />
                {title ? <Text style={styles.title}>{title}</Text> : null}

                {price ? <Text style={styles.title}>{price}</Text> : null}
              </TouchableOpacity>
            </Callout>
          ) : null}
        </Marker>
      </MapView>
    </View>
  );
};

export default MapViewWidget;

MapViewWidget.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  logo: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
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
