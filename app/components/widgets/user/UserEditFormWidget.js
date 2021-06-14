import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../../I18n';
import {
  bottomContentInset,
  text,
  width,
  height,
} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {updateUser} from '../../../redux/actions/user';
import {showCountryModal} from '../../../redux/actions';
import PropTypes from 'prop-types';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {isNull} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import BgContainer from '../../containers/BgContainer';
import KeyBoardContainer from '../../containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import widgetStyles from '../widgetStyles';
import DesigneratBtn from '../Button/DesigneratBtn';

const UserEditFormWidget = ({showIcon = true}) => {
  const {colors, logo} = useContext(GlobalValuesContext);
  const {token, auth, playerId, country} = useSelector(state => state);
  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [mobile, setMobile] = useState(auth.mobile);
  const [address, setAddress] = useState(auth.address);
  const [description, setDescription] = useState(auth.description);
  const [image, setImage] = useState(null);
  const [sampleLogo, setSampleLogo] = useState(null);
  const {goBack, navigate, dangerouslyGetParent} = useNavigation();
  const parent = dangerouslyGetParent();
  const dispatch = useDispatch();
  const [selectedCountry, setSelectedCountry] = useState(auth.country);
  const [currentCountry, setCurrentCountry] = useState(country);

  const handleSelectedCountry = () => {
    dispatch(showCountryModal({redirect: false}));
  };

  useMemo(() => {
    if (currentCountry.id !== country.id) {
      setSelectedCountry(country);
      setCurrentCountry(country);
    }
  }, [country]);

  const openPicker = () => {
    return ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      setImage(image);
      setSampleLogo(image.path);
    });
  };

  return (
    <KeyBoardContainer>
      {showIcon && (
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
      )}
      <TouchableOpacity
        onPress={() => openPicker()}
        style={{width: '100%', marginTop: 0, alignItems: 'center'}}>
        <FastImage
          source={{
            uri: !isNull(sampleLogo)
              ? sampleLogo
              : !isNull(auth.thumb)
              ? auth.thumb
              : logo,
          }}
          style={{
            width: 120,
            height: 120,
            margin: 20,
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 120 / 2,
          }}
          resizeMode="cover"
          loadingIndicatorSource={images.logo}
        />
      </TouchableOpacity>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Input
          inputContainerStyle={[widgetStyles.inputContainerStyle]}
          inputStyle={widgetStyles.inputStyle}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="default"
          defaultValue={name ? name : null}
          onChangeText={text => setName(text)}
          placeholder={name ? name : I18n.t('name')}
          label={I18n.t('name')}
        />
        <Input
          inputContainerStyle={[widgetStyles.inputContainerStyle]}
          inputStyle={widgetStyles.inputStyle}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="email-address"
          defaultValue={email ? email : null}
          onChangeText={text => setEmail(text)}
          placeholder={email ? email : I18n.t('email')}
          label={I18n.t('email')}
        />
        <Input
          inputContainerStyle={[widgetStyles.inputContainerStyle]}
          inputStyle={widgetStyles.inputStyle}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="number-pad"
          defaultValue={mobile ? mobile : null}
          onChangeText={text => setMobile(text)}
          placeholder={mobile ? mobile : I18n.t('mobile')}
          label={I18n.t('mobile')}
        />
        <TouchableOpacity
          onPress={() => handleSelectedCountry()}
          disabled={true}
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            backgroundColor: 'white',
            borderRadius: 5,
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
            {selectedCountry.slug}
          </Text>
        </TouchableOpacity>
        <Input
          inputContainerStyle={[widgetStyles.inputContainerStyle]}
          inputStyle={widgetStyles.inputStyle}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          numberOfLines={3}
          shake={true}
          keyboardType="default"
          defaultValue={description}
          onChangeText={text => setDescription(text)}
          label={I18n.t('description')}
          placeholder={I18n.t('description')}
        />
        <DesigneratBtn
          handleClick={() =>
            dispatch(
              updateUser({
                id: auth.id,
                api_token: token,
                name,
                email,
                mobile,
                country_id: selectedCountry.id,
                address,
                player_id: playerId,
                description,
                image,
              }),
            )
          }
          title={I18n.t('update_information')}
        />
      </View>
    </KeyBoardContainer>
  );
};

export default UserEditFormWidget;

UserEditFormWidget.propTypes = {};

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
