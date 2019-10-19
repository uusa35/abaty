import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  useContext
} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapView, {Marker} from 'react-native-maps';
import validate from 'validate.js';
import I18n, {isRTL} from '../../I18n';
import {text, width} from '../../constants';
import {Button, Input} from 'react-native-elements';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import Geolocation from '@react-native-community/geolocation';
import {axiosInstance} from '../../redux/actions/api';
import {useNavigation} from 'react-navigation-hooks';

const ChooseAddressScreen = () => {
  const [longitude, setLongitude] = useState(47.9323259);
  const [latitude, setLatitude] = useState(29.1857552);
  const [address, setAddress] = useState('');
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();

  useMemo(() => {
    // Geolocation.getCurrentPosition(info => {
    //   setLongitude(info.coords.longitude);
    //   setLatitude(info.coords.latitude);
    // });
  }, [latitude, longitude]);

  const setLocation = useCallback(e => {
    setLatitude(e.nativeEvent.coordinate.latitude);
    setLongitude(e.nativeEvent.coordinate.longitude);
  });

  const getYourAddress = useCallback(() => {
    axiosInstance
      .get('location/address', {params: {latitude, longitude}})
      .then(r => setAddress(r.data.address))
      .catch(e => console.log(e));
  });

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
      <View style={{width: '100%'}}>
        <MapView
          style={{
            width,
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
        </MapView>
        <View
          style={{alignItems: 'center', justifyContent: 'center', padding: 20}}>
          <Button
            onPress={() => getYourAddress()}
            raised
            containerStyle={{width: '100%', marginBottom: 10, marginTop: 10}}
            buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
            title={I18n.t('get_your_address_from_map')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color
            }}
          />
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.large,
              textAlign: 'center',
              marginTop: 10
            }}>
            {I18n.t('choose_address_from_map_or_you_can_write_your_map')}
          </Text>
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20
            }}
            inputStyle={{
              fontFamily: text.font,
              textAlign: isRTL ? 'right' : 'left'
            }}
            shake={true}
            keyboardType="default"
            defaultValue={address}
            onChangeText={address => setAddress(address)}
            placeholder={I18n.t('address')}
            label={I18n.t('address')}
            labelStyle={{
              paddingBottom: 10,
              paddingTop: 10,
              fontFamily: text.font,
              textAlign: 'left'
            }}
          />
          <Button
            onPress={() => navigate('ClassifiedStore', {address})}
            disabled={address.length < 5}
            raised
            containerStyle={{width: '100%', marginBottom: 10, marginTop: 10}}
            buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
            title={I18n.t('save_address_and_continue')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChooseAddressScreen;
