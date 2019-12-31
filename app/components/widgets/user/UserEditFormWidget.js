import React, {useState, useCallback, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {images, text, width} from '../../../constants';
import {updateUser} from '../../../redux/actions/user';
import {showCountryModal} from '../../../redux/actions';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {useNavigation} from 'react-navigation-hooks';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {isNull} from 'lodash';

const UserEditFormWidget = ({
  auth,
  player_id,
  logo,
  token,
  country,
  showIcon = true,
}) => {
  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [mobile, setMobile] = useState(auth.mobile);
  const [address, setAddress] = useState(auth.address);
  const [description, setDescription] = useState(auth.address);
  const [image, setImage] = useState(null);
  const [sampleLogo, setSampleLogo] = useState(null);
  const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  const parent = dangerouslyGetParent();
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);

  const openPicker = useCallback(() => {
    return ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      multiple: false,
      cropping: true,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      setImage(image);
      setSampleLogo(image.path);
    });
  });

  return (
    <ScrollView
      contentContainerStyle={{width}}
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentInset={{bottom: 150}}>
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
          alignSelf: 'center',
          flex: 1,
        }}>
        {showIcon ? (
          <Icon
            name="close"
            size={25}
            containerStyle={{
              zIndex: 99,
              position: 'absolute',
              top: 50,
              left: 50,
            }}
            hitSlop={{top: 100, bottom: 100, left: 100, right: 100}}
            onPress={() => {
              return parent.state.index && parent.state.index > 0
                ? goBack()
                : navigate('Home');
            }}
          />
        ) : null}
        <TouchableOpacity
          onPress={() => openPicker()}
          style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
          <FastImage
            source={{
              uri: !isNull(sampleLogo) ? sampleLogo : auth.thumb,
            }}
            style={{
              width: 120,
              height: 120,
              margin: 20,
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 120 / 2,
            }}
            resizeMode="contain"
            loadingIndicatorSource={images.logo}
          />
        </TouchableOpacity>
        <View style={{width: '90%', alignSelf: 'center'}}>
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
            }}
            shake={true}
            keyboardType="default"
            defaultValue={name ? name : null}
            onChangeText={text => setName(text)}
            placeholder={name ? name : I18n.t('name')}
          />
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
            }}
            shake={true}
            keyboardType="email-address"
            defaultValue={email ? email : null}
            onChangeText={text => setEmail(text)}
            placeholder={email ? email : I18n.t('email')}
          />
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
            }}
            shake={true}
            keyboardType="number-pad"
            defaultValue={mobile ? mobile : null}
            onChangeText={text => setMobile(text)}
            placeholder={mobile ? mobile : I18n.t('mobile')}
          />
          <TouchableOpacity
            onPress={() => {
              dispatch(showCountryModal());
            }}
            style={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20,
              height: 45,
              width: '95%',
              alignSelf: 'center',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.large,
                textAlign: isRTL ? 'right' : 'left',
                color: colors.main_theme_color,
              }}>
              {country.slug}
            </Text>
          </TouchableOpacity>
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20,
              height: 80,
            }}
            inputStyle={{
              fontFamily: text.font,
              fontSize: 14,
              textAlign: isRTL ? 'right' : 'left',
            }}
            numberOfLines={3}
            shake={true}
            keyboardType="default"
            defaultValue={address}
            onChangeText={text => setAddress(text)}
            placeholder={I18n.t('full_address')}
          />
          <Input
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 10,
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 20,
              height: 80,
            }}
            inputStyle={{
              fontFamily: text.font,
              fontSize: 14,
              textAlign: isRTL ? 'right' : 'left',
            }}
            numberOfLines={3}
            shake={true}
            keyboardType="default"
            defaultValue={description}
            onChangeText={text => setDescription(text)}
            placeholder={I18n.t('description')}
          />
          <Button
            raised
            containerStyle={{marginBottom: 10, width: '100%'}}
            buttonStyle={{
              backgroundColor: colors.btn_bg_theme_color,
              borderRadius: 0,
            }}
            titleStyle={{
              fontFamily: text.font,
              color: colors.btn_text_theme_color,
            }}
            title={I18n.t('update_information')}
            onPress={() =>
              dispatch(
                updateUser({
                  id: auth.id,
                  api_token: token,
                  name,
                  email,
                  mobile,
                  country_id: country.id,
                  address,
                  player_id,
                  description,
                  image,
                }),
              )
            }
          />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default UserEditFormWidget;

UserEditFormWidget.propTypes = {
  auth: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
