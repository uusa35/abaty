import React, {useState, useMemo, useCallback} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import {connect} from 'react-redux';
import {Button, Input, Icon} from 'react-native-elements';
import I18n, {isRTL} from '../I18n';
import {images, text, width} from '../constants';
import {
  showAreaModal,
  showCountryModal,
  storeClassified
} from '../redux/actions';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-crop-picker';
import {map} from 'lodash';
import widgetStyles from '../components/widgets/widgetStyles';
import ClassifiedStorePropertiesWidget from '../components/widgets/property/ClassifiedStorePropertiesWidget';

const ClassifiedStoreScreen = ({
  auth,
  categories,
  colors,
  country,
  area,
  dispatch,
  properties
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
      includeBase64: true,
      includeExif: true,
      maxFiles: 5
    }).then(images => {
      console.log('images', images);
      setImages(images);
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
        alignSelf: 'center'
      }}>
      <TouchableOpacity
        onPress={() => openPicker()}
        style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
        <Icon
          name="camera"
          type="evilicon"
          color="lightgrey"
          size={90}
          containerStyle={{
            margin: 15,
            width: 120,
            height: 120,
            borderRadius: 120 / 2,
            borderColor: 'lightgrey',
            borderWidth: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        />
        <Text style={{fontFamily: text.font, fontSize: text.medium}}>
          {I18n.t('add_your_images')}
        </Text>
      </TouchableOpacity>
      {!validate.isEmpty(images) ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 10
          }}
          style={[
            widgetStyles.wrapper,
            {borderWidth: 1, borderColor: 'lightgrey', minHeight: 120}
          ]}>
          {map(images, (img, i) => (
            <FastImage
              key={i}
              source={{uri: img.sourceURL}}
              style={{width: 100, height: 100, marginRight: 5, marginLeft: 5}}
            />
          ))}
        </ScrollView>
      ) : null}
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
          placeholder={I18n.t('title')}
          label={I18n.t('title')}
          labelStyle={{
            paddingBottom: 10,
            paddingTop: 10,
            fontFamily: text.font,
            textAlign: 'left'
          }}
        />
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
            fontFamily: text.font,
            textAlign: 'left'
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
            fontFamily: text.font,
            textAlign: 'left'
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
            fontFamily: text.font,
            textAlign: 'left'
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
        {!validate.isEmpty(area) ? (
          <TouchableOpacity
            // onPress={() => dispatch(showAreaModal())}
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
              {I18n.t('area')} {area ? area.slug : I18n.t('choose_area')}
            </Text>
          </TouchableOpacity>
        ) : null}
        {!validate.isEmpty(properties) ? (
          <ClassifiedStorePropertiesWidget elements={properties} />
        ) : null}
        <Button
          raised
          containerStyle={{marginBottom: 10, marginTop: 10, width: '100%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0
          }}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color
          }}
          title={I18n.t('confirm')}
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
    area: state.area,
    colors: state.settings.colors,
    newClassified: state.newClassified,
    properties: state.properties
  };
}

export default connect(mapStateToProps)(ClassifiedStoreScreen);

ClassifiedStoreScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  country: PropTypes.object.isRequired,
  colors: PropTypes.object.isRequired,
  categories: PropTypes.array.isRequired,
  properties: PropTypes.array.isRequired
};

const styles = StyleSheet.create({});
