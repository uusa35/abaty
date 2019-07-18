import React, {useContext} from 'react';
import {Linking, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import MapView, {Marker} from 'react-native-maps';
import {width, text, links} from '../../constants';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const MapViewWidget = ({
  title,
  longitude,
  latitude,
  height,
  customWidth,
  logo,
  showTitle = false
}) => {
  const {colors} = useContext(GlobalValuesContext);
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
    </View>
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
