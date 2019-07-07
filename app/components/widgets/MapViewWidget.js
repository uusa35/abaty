import React from 'react';
import {Linking, Text, TouchableOpacity, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import MapView, {Marker} from 'react-native-maps';
import {width, text, links} from '../../constants';

const MapViewWidget = ({
  title,
  longitude,
  latitude,
  height,
  customWidth,
  logo
}) => {
  return (
    <MapView
      style={{
        width: width ? width : customWidth,
        alignSelf: 'center',
        height: height ? height : '25%'
      }}
      title={title}
      zoomEnabled={true}
      initialRegion={{
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        latitudeDelta: 0.3,
        longitudeDelta: 0.3
      }}>
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude
        }}>
        <TouchableOpacity
          style={{justifyContent: 'center', alignItems: 'center'}}
          onPress={() =>
            Linking.openURL(`${links.googleMapUrl}${latitude},${longitude}`)
          }>
          {logo ? (
            <FastImage
              style={styles.logo}
              source={{uri: logo}}
              resizeMode="contain"
            />
          ) : null}
          <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
      </Marker>
    </MapView>
  );
};

export default React.memo(MapViewWidget);

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
    fontSize: 10,
    margin: 5
  },
  logo: {
    width: 30,
    height: 30
  }
});
