import React, {useMemo, useState, useCallback, useContext} from 'react';
import {View, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MapView, {Marker} from 'react-native-maps';
import I18n, {isRTL} from '../../I18n';
import {text, width, images} from '../../constants';
import {Button, Input} from 'react-native-elements';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
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
      contentInset={{bottom: 200}}
      contentContainerStyle={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
      }}>
      <View style={{width: '100%', flex: 1}}>
        <MapView
          style={{
            width,
            height: '100%',
          }}
          title={I18n.t('google_map')}
          zoomEnabled={true}
          initialRegion={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            latitudeDelta: 0.6922,
            longitudeDelta: 0.0421,
          }}>
          <Marker
            draggable
            coordinate={{
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude),
            }}
            image={images.pin}
            onDragEnd={e => setLocation(e)}>
            <View
              style={{
                alignSelf: 'center',
                position: 'relative',
                left: 30,
                marginTop: 50,
                minWidth: 100,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: text.font,
                  fontSize: text.small,
                }}>
                {I18n.t('choose_your_location')}
              </Text>
            </View>
          </Marker>
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
              color: colors.btn_text_theme_color,
            }}
          />
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.medium,
              textAlign: 'center',
              marginTop: 10,
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
              marginBottom: 20,
            }}
            inputStyle={{
              fontFamily: text.font,
              textAlign: isRTL ? 'right' : 'left',
              fontSize: text.medium,
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
              fontSize: text.medium,
              textAlign: 'left',
            }}
          />
          <Button
            onPress={() =>
              navigate('ClassifiedStore', {address, longitude, latitude})
            }
            disabled={address.length < 5}
            raised
            containerStyle={{width: '100%', marginBottom: 10, marginTop: 10}}
            buttonStyle={{backgroundColor: colors.btn_bg_theme_color}}
            title={I18n.t('save_address_and_continue')}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
              fontSize: text.medium,
            }}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ChooseAddressScreen;