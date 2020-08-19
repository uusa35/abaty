import React, {useState, useContext, Fragment} from 'react';
import {
  ImageBackground,
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
  height,
  iconSizes,
} from '../../../constants/sizes';
import {icons} from '../../../constants/images';
import {enableErrorMessage, showCountryModal} from '../../../redux/actions';
import {companyRegister, register} from '../../../redux/actions/user';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {ABATI} from './../../../../app';
import {useDispatch, useSelector} from 'react-redux';
import {filter, first, map, remove} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';
import ImagePicker from 'react-native-image-crop-picker';
import widgetStyles from '../widgetStyles';
import validate from 'validate.js';
import {validateSubmitRegister} from '../../../constants/validations';
import KeyBoardContainer from '../../containers/KeyBoardContainer';

const RegisterFormWidget = () => {
  const {colors, logo} = useContext(GlobalValuesContext);
  const {country, playerId, role, roles} = useSelector((state) => state);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [sampleLogo, setSampleLogo] = useState(null);
  const [images, setImages] = useState();

  const openLogoPicker = () => {
    return ImagePicker.openPicker({
      width: 1000,
      height: 1000,
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: true,
      includeExif: true,
      compressImageQuality: 0.5,
      storageOptions: {
        skipBackup: true,
      },
    }).then((image) => {
      setImage(image);
      // setSampleLogo(image.path);
    });
  };

  const openImagesPicker = () => {
    return ImagePicker.openPicker({
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 1440,
      multiple: true,
      cropping: true,
      freeStyleCropEnabled: true,
      includeBase64: false,
      includeExif: true,
      maxFiles: 5,
      minFiles: 2,
      compressImageQuality: 0.5,
      storageOptions: {
        skipBackup: true,
      },
    }).then((images) => {
      setImages(images);
    });
  };

  const removeImage = (i) => {
    const newImages = remove(images, (img, index) => i !== index);
    setImages(newImages);
  };

  const handleRegister = () => {
    if (!validate.isEmpty(role) && !role.isClient) {
      return validateSubmitRegister
        .validate({
          name,
          email,
          password,
          mobile,
          country_id: country.id,
          address,
          player_id: playerId,
          description,
          image,
          images,
          role_id: role.id,
        })
        .then((r) => {
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
              password,
              mobile,
              country_id: country.id,
              address,
              player_id: playerId,
              description,
              image,
              images,
              role_id: role
                ? role.id
                : first(filter(roles, (r) => r.isCompany)).id,
            }),
          );
        })
        .catch((e) => {
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
          password,
          mobile,
          country_id: country.id,
          address,
          player_id: playerId,
          description,
          role_id: role ? role.id : first(filter(roles, (r) => r.isClient)).id,
        }),
      );
    }
  };

  return (
    <KeyBoardContainer>
      <ImageLoaderContainer
        img={logo}
        style={{
          width: 50,
          height: 50,
          marginTop: '3%',
          marginBottom: '3%',
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />
      {(role.isDesigner || role.isCompany) && (
        <TouchableOpacity
          onPress={() => openLogoPicker()}
          style={{width: '100%', marginTop: 0, alignItems: 'center'}}>
          <ImageLoaderContainer
            img={image && image.path ? image.path : sampleLogo}
            style={{
              width: 120,
              height: 120,
              margin: 10,
              borderWidth: 1,
              borderColor: 'lightgrey',
              borderRadius: 120 / 2,
            }}
            resizeMode="cover"
          />
          <Text style={{fontFamily: text.font, fontSize: text.small}}>
            {I18n.t('add_logo')}
          </Text>
        </TouchableOpacity>
      )}
      <Input
        placeholder={I18n.t('name') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          // marginBottom: 20,
        }}
        label={I18n.t('name')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        shake={true}
        keyboardType="default"
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder={I18n.t('password')}
        secureTextEntry={true}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          // marginBottom: 20,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        label={I18n.t('password')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        shake={true}
        keyboardType="default"
        onChangeText={(text) => setPassword(text)}
      />
      <Input
        placeholder={I18n.t('email') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          // marginBottom: 20,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        label={I18n.t('email')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        shake={true}
        keyboardType="email-address"
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        leftIcon={() => <Text>+{country.calling_code}</Text>}
        leftIconContainerStyle={{paddingRight: 15}}
        placeholder={I18n.t('mobile') + '*'}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          // marginBottom: 20,
        }}
        inputStyle={{
          fontFamily: text.font,
          textAlign: isRTL ? 'right' : 'left',
        }}
        label={I18n.t('mobile')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        shake={true}
        keyboardType="number-pad"
        onChangeText={(text) => setMobile(text)}
      />
      <View style={{width: '100%'}}>
        <Text
          style={[
            styles.titleLabelStyle,
            {
              color: colors.main_theme_color,
              paddingBottom: 10,
              paddingLeft: 20,
            },
          ]}>
          {I18n.t('country')}
        </Text>
        <TouchableOpacity
          onPress={() => {
            dispatch(showCountryModal());
          }}
          style={{
            borderWidth: 1,
            borderColor: 'lightgrey',
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
            {country.slug}
          </Text>
        </TouchableOpacity>
      </View>
      <Input
        placeholder={I18n.t('address')}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: 'lightgrey',
          borderRadius: 5,
          paddingLeft: 15,
          paddingRight: 15,
          height: 80,
        }}
        inputStyle={{
          fontFamily: text.font,
          fontSize: 14,
          textAlign: isRTL ? 'right' : 'left',
        }}
        numberOfLines={3}
        shake={true}
        label={I18n.t('address')}
        labelStyle={[
          styles.titleLabelStyle,
          {color: colors.main_theme_color, paddingBottom: 10},
        ]}
        keyboardType="default"
        onChangeText={(text) => setAddress(text)}
      />
      {!ABATI && (
        <Input
          placeholder={I18n.t('description')}
          inputContainerStyle={{
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 5,
            paddingLeft: 15,
            paddingRight: 15,
            height: 80,
          }}
          inputStyle={{
            fontFamily: text.font,
            fontSize: 14,
            textAlign: isRTL ? 'right' : 'left',
          }}
          numberOfLines={3}
          shake={true}
          label={I18n.t('description')}
          labelStyle={[
            styles.titleLabelStyle,
            {color: colors.main_theme_color, paddingBottom: 10},
          ]}
          keyboardType="default"
          onChangeText={(text) => setDescription(text)}
        />
      )}

      {(role.isDesigner || role.isCompany) && (
        <Fragment>
          <Text
            style={[
              styles.titleLabelStyle,
              {
                color: colors.main_theme_color,
                paddingBottom: 10,
                paddingLeft: 20,
                width: '100%',
              },
            ]}>
            {I18n.t('product_samples')}
          </Text>
          <TouchableOpacity
            onPress={() => openImagesPicker()}
            style={{width: '100%', marginTop: 0, alignItems: 'center'}}>
            {validate.isEmpty(first(images)) && (
              <ImageLoaderContainer
                img={first(images) ? first(images).path : sampleLogo}
                style={{
                  width: 120,
                  height: 120,
                  margin: 20,
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  borderRadius: 120 / 2,
                }}
                resizeMode="cover"
              />
            )}
          </TouchableOpacity>
        </Fragment>
      )}

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

      <Button
        raised
        containerStyle={{marginBottom: 10, width: '90%', alignSelf: 'center'}}
        buttonStyle={{
          backgroundColor: colors.btn_bg_theme_color,
          borderRadius: 0,
        }}
        title={I18n.t('register')}
        titleStyle={[
          styles.titleLabelStyle,
          {color: colors.btn_text_theme_color},
        ]}
        onPress={() => handleRegister()}
      />
    </KeyBoardContainer>
  );
};

export default React.memo(RegisterFormWidget);

RegisterFormWidget.propTypes = {};

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
