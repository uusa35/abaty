import React, {useMemo, useState, useCallback, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapView, {Marker} from 'react-native-maps';
import validate from 'validate.js';
import {addToCart} from '../../redux/actions';
import I18n from '../../I18n';
import {text} from '../../constants';
import {Button} from 'react-native-elements';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const ChooseAddressScreen = () => {
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const {colors} = useContext(GlobalValuesContext);

  useMemo(() => {
    if (validate.isEmpty(latitude) && validate.isEmpty(longitude)) {
      navigator.geolocation.getCurrentPosition(
        initialPosition => {
          let latitude = initialPosition.coords.latitude;
          let longitude = initialPosition.coords.longitude;
          this.setState({latitude, longitude});
        },
        e => console.log('error form location', e.message),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    }
  }, [latitude, longitude]);

  const setLocation = useCallback(e => {
    setLatitude(e.nativeEvent.coordinate.latitude);
    setLongitude(e.nativeEvent.coordinate.longitude);
  });

  console.log('lat', latitude);
  console.log('long', longitude);

  return (
    <KeyboardAwareScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 150}}
      contentContainerStyle={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
      }}>
      <View>
        <MapView
          style={{
            width: '100%',
            height: 300
          }}
          title={I18n.t('google_map')}
          zoomEnabled={true}
          initialRegion={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.9922,
            longitudeDelta: 0.0421
          }}>
          <Marker
            draggable
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude)
            }}
            onDragEnd={e => setLocation(e)}
            title={I18n.t('choose_your_location')}
          />
          <Button
            onPress={() => console.log('pressed')}
            raised
            containerStyle={{width: '100%', marginBottom: 10, marginTop: 10}}
            buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
            title={I18n.t('show_address')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color
            }}
          />
        </MapView>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChooseAddressScreen;
