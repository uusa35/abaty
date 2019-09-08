import React, {useState, useMemo, useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, Input} from 'react-native-elements';
import I18n, {isRTL} from '../I18n';
import {images, text, width} from '../constants';
import {showCountryModal, storeClassified} from '../redux/actions';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {map} from 'lodash';

const ClassifiedStoreScreen = ({
  auth,
  categories,
  colors,
  country,
  dispatch
}) => {
  const [name, setName] = useState(!validate.isEmpty(auth) ? auth.name : null);
  const [email, setEmail] = useState(
    !validate.isEmpty(auth) ? auth.email : null
  );
  const [mobile, setMobile] = useState(
    !validate.isEmpty(auth) ? auth.mobile : null
  );
  const [address, setAddress] = useState(
    !validate.isEmpty(auth) ? auth.email : null
  );
  const [description, setDescription] = useState(
    !validate.isEmpty(auth) ? auth.description : null
  );
  const [images, setImages] = useState('');
  const [sampleLogo, setSampleLogo] = useState('');

  const openPicker = useCallback(() => {
    return ImagePicker.openPicker({
      width: 1440,
      height: 1080,
      multiple: true,
      cropping: true,
      includeBase64: false,
      includeExif: false,
      maxFiles: 5
    }).then(images => {
      map(images, (img, i) => {
        console.log(img);
      });
    });
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
        alignSelf: 'center',
        flex: 1
      }}>
      <TouchableOpacity
        onPress={() => openPicker()}
        style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
        <FastImage
          source={{
            uri: auth.thumb ? auth.thumb : logo
          }}
          style={{
            width: 120,
            height: 120,
            margin: 20,
            borderWidth: 1,
            borderColor: 'lightgrey',
            borderRadius: 120 / 2
          }}
          resizeMode="cover"
          loadingIndicatorSource={images.logo}
        />
      </TouchableOpacity>
      <View style={{width: '90%', alignItems: 'center'}}>
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
          onChangeText={text => setName(text)}
          placeholder={name ? name : I18n.t('name')}
          label={I18n.t('name')}
          labelStyle={{
            paddingBottom: 10,
            paddingTop: 10,
            fontFamily: text.font
          }}
        />
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
          keyboardType="email-address"
          onChangeText={text => setEmail(text)}
          placeholder={email ? email : I18n.t('email')}
          label={I18n.t('email')}
          labelStyle={{
            paddingBottom: 10,
            paddingTop: 10,
            fontFamily: text.font
          }}
        />
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
          keyboardType="number-pad"
          onChangeText={text => setMobile(text)}
          placeholder={mobile ? mobile : I18n.t('mobile')}
          label={I18n.t('mobile')}
          labelStyle={{
            paddingBottom: 10,
            paddingTop: 10,
            fontFamily: text.font
          }}
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
            alignItems: 'center'
          }}>
          <Text
            style={{
              fontFamily: text.font,
              fontSize: text.large,
              textAlign: isRTL ? 'right' : 'left',
              color: colors.main_theme_color
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
            height: 80
          }}
          inputStyle={{
            fontFamily: text.font,
            fontSize: 14,
            textAlign: isRTL ? 'right' : 'left'
          }}
          numberOfLines={3}
          shake={true}
          keyboardType="default"
          onChangeText={text => setDescription(text)}
          placeholder={description ? description : I18n.t('description')}
          label={I18n.t('description')}
          labelStyle={{
            paddingBottom: 10,
            paddingTop: 10,
            fontFamily: text.font
          }}
        />
        <Button
          raised
          containerStyle={{marginBottom: 10, width: '90%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0
          }}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
          title={I18n.t('update_information')}
          onPress={() =>
            dispatch(
              storeClassified({
                user_id: auth.id,
                api_token: auth.token,
                name,
                description,
                mobile,
                country_id: country.id,
                area_id: area.id,
                images
              })
            )
          }
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    auth: state.auth,
    country: state.country,
    colors: state.settings.colors,
    newClassified: state.newClassified
  };
}

export default connect(mapStateToProps)(ClassifiedStoreScreen);

ClassifiedStoreScreen.propTypes = {
  auth: PropTypes.object.isRequired
};

const styles = StyleSheet.create({});
