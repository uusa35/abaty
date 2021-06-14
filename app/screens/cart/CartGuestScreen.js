import React, {useState, useContext, Fragment, useEffect} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, CheckBox, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {
  bottomContentInset,
  text,
  height,
  iconSizes,
  formWidget,
} from '../../constants/sizes';
import {enableErrorMessage, showCountryModal} from '../../redux/actions';
import {
  companyRegister,
  register,
  setRole,
  submitAuth,
} from '../../redux/actions/user';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {useDispatch, useSelector} from 'react-redux';
import {filter, first, map, remove} from 'lodash';
import ImageLoaderContainer from '../../components/widgets/ImageLoaderContainer';
import ImagePicker from 'react-native-image-crop-picker';
import widgetStyles from '../../components/widgets/widgetStyles';
import validate from 'validate.js';
import {validateSubmitRegister} from '../../constants/validations';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';
import DesineratRegisterFormIsMaleComponenet from './../../components/widgets/user/DesineratRegisterFormIsMaleComponenet';
import {convertNumberToEnglish} from '../../helpers';
import {WebView} from 'react-native-webview';
import {DESIGNERAT, APP_CASE} from '../../../app.json';
import BgContainer from '../../components/containers/BgContainer';

const CartGuestScreen = ({showLabel = false}) => {
  const {colors, logo} = useContext(GlobalValuesContext);
  const {country, playerId, role, roles, settings} = useSelector(
    state => state,
  );
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [banner, setBanner] = useState(null);
  const [sampleLogo, setSampleLogo] = useState(null);
  const [images, setImages] = useState();
  const [isMale, setIsMale] = useState(false);
  const [checked, setChecked] = useState(role.isClient);

  useEffect(() => {
    dispatch(setRole(first(filter(roles, r => r.isClient))));
  }, []);

  const openLogoPicker = () => {
    return ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: false,
      includeBase64: true,
      includeExif: true,
      compressImageQuality: 0.5,
      storageOptions: {
        skipBackup: true,
      },
    }).then(image => {
      setImage(image);
      // setSampleLogo(image.path);
    });
  };

  const openBannerPicker = () => {
    return ImagePicker.openPicker({
      width: 1080,
      height: 410,
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: false,
      includeBase64: true,
      includeExif: true,
      compressImageQuality: 0.5,
      storageOptions: {
        skipBackup: true,
      },
    }).then(image => {
      setBanner(image);
    });
  };

  const openImagesPicker = () => {
    return ImagePicker.openPicker({
      width: 1080,
      height: 1440,
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 1440,
      multiple: true,
      cropping: true,
      freeStyleCropEnabled: false,
      includeBase64: false,
      includeExif: true,
      maxFiles: 2,
      minFiles: 1,
      compressImageQuality: 0.5,
      storageOptions: {
        skipBackup: true,
      },
    }).then(images => {
      setImages(images);
    });
  };

  const removeImage = i => {
    const newImages = remove(images, (img, index) => i !== index);
    setImages(newImages);
  };

  const handleRegister = () => {
    if (!validate.isEmpty(role) && !role.isClient) {
      return validateSubmitRegister
        .validate({
          name,
          email,
          password: mobile,
          mobile,
          country_id: country.id,
          address,
          player_id: playerId,
          description,
          image,
          images,
          role_id: role.id,
        })
        .then(r => {
          // ImagePicker.clean()
          //   .then(() => {
          // console.log('removed all tmp images from tmp directory');
          // })
          // .catch((e) => {
          // console.log('picker error', e);
          // });
          return dispatch(
            companyRegister({
              name,
              email,
              password: mobile,
              mobile,
              country_id: country.id,
              address,
              player_id: playerId,
              description,
              image,
              banner,
              images,
              role_id: role
                ? role.id
                : first(filter(roles, r => r.isCompany)).id,
            }),
          );
        })
        .catch(e => {
          const {message, item} = first(e.errors);
          return dispatch(
            enableErrorMessage(
              message ? I18n.t(message, {item}) : I18n.t(first(e.errors)),
            ),
          );
        });
    } else {
      dispatch(
        register({
          name,
          email,
          password: mobile,
          mobile,
          country_id: country.id,
          address,
          player_id: playerId,
          description,
          is_male: isMale,
          role_id: role ? role.id : first(filter(roles, r => r.isClient)).id,
        }),
      );
    }
  };

  return (
    <BgContainer showImage={false}>
      <KeyBoardContainer>
        <ImageLoaderContainer
          img={logo}
          style={{
            width: 50,
            height: 50,
            marginTop: '10%',
            marginBottom: '10%',
            alignSelf: 'center',
          }}
          resizeMode="contain"
        />
        <Input
          placeholder={I18n.t('email') + '*'}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderBottomWidth: 0,
              borderRadius: 0,
              borderTopRightRadius: 3,
              borderTopLeftRadius: 3,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          label={showLabel ? I18n.t('email') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          leftIcon={() => (
            <Icon
              name="envelope"
              type="evilicon"
              size={iconSizes.smaller}
              // onPress={() => setVisiblePassword(!visiblePassword)}
            />
          )}
        />
        {/*<Input*/}
        {/*    placeholder={I18n.t('password')}*/}
        {/*    secureTextEntry={true}*/}
        {/*    containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}*/}
        {/*    inputContainerStyle={[*/}
        {/*        widgetStyles.inputContainerStyle,*/}
        {/*        {borderBottomWidth: 0, borderRadius: 0},*/}
        {/*    ]}*/}
        {/*    inputStyle={widgetStyles.inputStyle}*/}
        {/*    label={showLabel ? I18n.t('password') : null}*/}
        {/*    labelStyle={[*/}
        {/*        styles.titleLabelStyle,*/}
        {/*        {color: colors.main_theme_color, paddingBottom: 10},*/}
        {/*    ]}*/}
        {/*    shake={true}*/}
        {/*    keyboardType="default"*/}
        {/*    onChangeText={text => setPassword(text)}*/}
        {/*    leftIcon={() => (*/}
        {/*        <Icon*/}
        {/*            name="lock"*/}
        {/*            type="evilicon"*/}
        {/*            size={iconSizes.smaller}*/}
        {/*            // onPress={() => setVisiblePassword(!visiblePassword)}*/}
        {/*        />*/}
        {/*    )}*/}
        {/*/>*/}
        <Input
          placeholder={I18n.t('first_name') + '*'}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderBottomWidth: 0,
              borderRadius: 0,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          label={showLabel ? I18n.t('first_name') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="default"
          onChangeText={text => setName(text)}
        />
        <Input
          leftIcon={() => (
            <Text style={{color: 'black', textAlign: 'left'}}>
              +{country.calling_code}
            </Text>
          )}
          leftIconContainerStyle={{paddingRight: 15}}
          containerStyle={{marginBottom: 0, paddingBottom: 0, height: 50}}
          placeholder={I18n.t('mobile') + '*'}
          inputContainerStyle={[
            widgetStyles.inputContainerStyle,
            {
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
              borderBottomLeftRadius: 3,
              borderBottomRightRadius: 3,
            },
          ]}
          inputStyle={widgetStyles.inputStyle}
          label={showLabel ? I18n.t('mobile') : null}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          shake={true}
          keyboardType="number-pad"
          onChangeText={text => setMobile(convertNumberToEnglish(text))}
        />

        {/*<DesineratRegisterFormIsMaleComponenet*/}
        {/*    isMale={isMale}*/}
        {/*    setIsMale={setIsMale}*/}
        {/*/>*/}
        {/*{(role.isDesigner || role.isCompany) && (*/}
        {/*  <>*/}
        {/*    <Text*/}
        {/*      style={[*/}
        {/*        styles.titleLabelStyle,*/}
        {/*        {*/}
        {/*          color: colors.main_theme_color,*/}
        {/*          marginTop: 20,*/}
        {/*          paddingLeft: 15,*/}
        {/*        },*/}
        {/*      ]}>*/}
        {/*      {I18n.t('more_images')}*/}
        {/*    </Text>*/}
        {/*    <View style={{backgroundColor: 'white', borderRadius: 5, margin: 15}}>*/}
        {/*      <TouchableOpacity*/}
        {/*        onPress={() => openImagesPicker()}*/}
        {/*        style={{width: '100%', marginTop: 0, alignItems: 'center'}}>*/}
        {/*        {validate.isEmpty(first(images)) && (*/}
        {/*          <ImageLoaderContainer*/}
        {/*            img={first(images) ? first(images).path : sampleLogo}*/}
        {/*            style={{*/}
        {/*              width: 120,*/}
        {/*              height: 120,*/}
        {/*              margin: 20,*/}
        {/*              borderWidth: 1,*/}
        {/*              borderColor: 'lightgrey',*/}
        {/*              borderRadius: 120 / 2,*/}
        {/*            }}*/}
        {/*            resizeMode="cover"*/}
        {/*          />*/}
        {/*        )}*/}
        {/*      </TouchableOpacity>*/}
        {/*    </View>*/}
        {/*  </>*/}
        {/*)}*/}

        {!validate.isEmpty(images) && (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
            }}
            style={[
              widgetStyles.wrapper,
              {borderWidth: 1, borderColor: 'lightgrey', minHeight: 120},
            ]}>
            {map(images, (img, i) => (
              <ImageBackground
                key={i}
                source={{uri: img.path}}
                style={{
                  width: 100,
                  height: 100,
                  marginRight: 5,
                  marginLeft: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    opacity: 0.7,
                  }}>
                  <Icon
                    size={30}
                    name="close"
                    type="evil-icons"
                    onPress={() => removeImage(i)}
                  />
                </View>
              </ImageBackground>
            ))}
          </ScrollView>
        )}
        {!role.isClient && (
          <View style={{backgroundColor: 'white', margin: 15, padding: 15}}>
            {!validate.isEmpty(settings.policy) &&
              settings.policy.length > 100 &&
              DESIGNERAT && (
                <WebView
                  showsVerticalScrollIndicator={false}
                  showsHorizontalScrollIndicator={false}
                  source={{html: settings.policy}}
                  style={{
                    width: '100%',
                    minHeight: height / 2.3,
                    marginTop: 10,
                  }}
                />
              )}
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CheckBox
                containerStyle={{
                  backgroundColor: 'transparent',
                  alignItems: 'baseline',
                  justifyContent: 'flex-start',
                  borderWidth: 0,
                  paddingLeft: 0,
                  paddingRight: 0,
                  marginRight: 0,
                  marginLeft: 0,
                }}
                title={`${I18n.t('agree_on_polices')} ${I18n.t(APP_CASE)}`}
                iconType="material"
                checkedIcon="check-box"
                uncheckedIcon="check-box-outline-blank"
                checked={checked}
                checkedColor={colors.btn_bg_theme_color}
                uncheckedColor={colors.btn_bg_theme_color}
                style={{color: colors.btn_bg_theme_color}}
                onPress={() => setChecked(!checked)}
                textStyle={{
                  fontFamily: text.font,
                  paddingTop: 5,
                  fontSize: text.small,
                }}
              />
              <Icon
                name="book"
                type="octicon"
                size={iconSizes.smaller}
                hitSlop={{
                  top: iconSizes.smaller,
                  bottom: iconSizes.smaller,
                  left: iconSizes.smaller,
                  right: iconSizes.smaller,
                }}
                onPress={() => navigation.navigate('Policy')}
              />
            </View>
          </View>
        )}
        <DesigneratBtn
          disabled={!checked}
          handleClick={() => handleRegister()}
          marginTop={20}
          title={I18n.t('continue')}
        />
      </KeyBoardContainer>
    </BgContainer>
  );
};

export default React.memo(CartGuestScreen);

CartGuestScreen.propTypes = {};

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
