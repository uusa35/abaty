import React, {useContext} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Callout,
  CalloutSubview,
} from 'react-native-maps';
import {width, text} from '../../constants/sizes';
import {images} from '../../constants/images';
import I18n from '../../I18n';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import CallOutView from './map/CallOutView';
import {getProductConvertedFinalPrice} from '../../helpers';
import {round, map} from 'lodash';

const MapViewWidget = ({
  height = 350,
  customWidth,
  showTitle = false,
  showCallOut = true,
  title = null,
  image = null,
  description = null,
  isMulti = false,
  price = '',
  elements = [],
  element,
  longitude,
  latitude,
}) => {
  const {colors, exchange_rate} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        // borderWidth : 10
        // marginTop: 10,
        // marginBottom: 10,
      }}>
      {showTitle ? (
        <Text
          style={{
            fontFamily: text.font,
            fontSize: text.medium,
            marginBottom: 10,
            textAlign: 'left',
            color: colors.header_one_theme_color,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
            elevation: 1,
          }}>
          {I18n.t('location')}
        </Text>
      ) : null}
      <MapView
        style={{
          width: width ? width : customWidth,
          alignSelf: 'center',
          height: height ? height : '25%',
        }}
        loadingBackgroundColor={`white`}
        title={title}
        zoomEnabled={true}
        // cacheEnabled={true}
        cacheLoadingBackgroundColor={'#eeeeee'}
        cacheLoadingIndicatorColor={'#666666'}
        // followUserLocation={true}
        // showsUserLocation={true}
        zoomControlEnabled={true}
        zoomTapEnabled={true}
        showsScale={true}
        // cacheEnabled={true}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}>
        <View
          style={{
            flex: 1,
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {!isMulti ? (
            <Marker
              title={title}
              // onPress={() => }
              scrollEnabled={false}
              image={images.pin}
              opacity={1}
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}>
              {showCallOut && image ? (
                <CallOutView
                  element={element}
                  image={image}
                  description={description}
                  title={title}
                  price={price}
                  latitude={element.latitude}
                  longitude={element.longitude}
                />
              ) : null}
            </Marker>
          ) : (
            map(elements, (element, i) => (
              <Marker
                key={i}
                title={element.title}
                // onPress={() => console.log('here')}
                scrollEnabled={false}
                image={images.pin}
                opacity={1}
                element={element}
                coordinate={{
                  latitude: element.latitude,
                  longitude: element.longitude,
                }}>
                {showCallOut ? (
                  <CallOutView
                    element={element}
                    latitude={element.latitude}
                    longitude={element.longitude}
                    title={element.name}
                    description={element.description}
                    address={element.address}
                    image={element.thumb}
                    price={round(
                      getProductConvertedFinalPrice(
                        element.price,
                        exchange_rate,
                      ),
                      2,
                    )}
                  />
                ) : null}
              </Marker>
            ))
          )}
        </View>
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
  width: PropTypes.number,
};

const styles = StyleSheet.create({
  title: {
    color: 'black',
    fontFamily: text.font,
    fontSize: text.medium,
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
