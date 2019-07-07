import React, {PureComponent} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import I18n from './../../I18n';
import MapView, {Marker} from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import {links} from './../../constants';
import Communications from 'react-native-communications';

export default class LocationWidget extends PureComponent {
  render() {
    const {settings} = this.props;
    console.log('rendering Location widget');
    return (
      <View style={styles.panelWrapper}>
        <View style={styles.panelTitleWrapper}>
          <Text style={styles.panelTitle}>{I18n.t('location')}</Text>
        </View>
        <View style={styles.panelContentWrapper}>
          <MapView
            style={{
              width: '100%',
              height: 170,
              borderRadius: 10
            }}
            title={settings.name}
            zoomEnabled={true}
            initialRegion={{
              latitude: parseFloat(settings.latitude),
              longitude: parseFloat(settings.longitude),
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421
            }}>
            <Marker
              coordinate={{
                latitude: settings.latitude,
                longitude: settings.longitude
              }}>
              <TouchableOpacity
                style={{justifyContent: 'center', alignItems: 'center'}}
                onPress={() =>
                  Communications.web(
                    `${links.googleMapUrl}${settings.latitude},${settings.longitude}`
                  )
                }>
                <FastImage
                  style={styles.imgCircle}
                  source={{
                    uri: `${settings.logo}`,
                    priority: FastImage.priority.normal
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
                <Text style={styles.markerTitle}>{settings.name}</Text>
              </TouchableOpacity>
            </Marker>
          </MapView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panelWrapper: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'darkgrey',
    shadowColor: 'black',
    shadowOffset: {width: 1, height: 1},
    shadowRadius: 2,
    shadowOpacity: 0.3
  },
  panelTitleWrapper: {
    backgroundColor: '#474747'
  },
  panelTitle: {
    paddingLeft: 15,
    padding: 5,
    fontSize: 18,
    color: 'white',
    fontFamily: 'cairo',
    textAlign: 'left'
  },
  panelContentWrapper: {
    padding: 15,
    backgroundColor: 'white'
  },
  panelContent: {
    fontFamily: 'cairo',
    fontSize: 15,
    textAlign: 'left'
  },
  imgCircle: {
    width: 30,
    height: 30,
    borderRadius: 30 / 2
  },
  markerTitle: {
    color: 'black',
    fontFamily: 'cairo',
    fontSize: 10,
    margin: 5
  }
});
