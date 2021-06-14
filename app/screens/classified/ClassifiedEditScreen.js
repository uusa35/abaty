import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Button, Input, Icon, CheckBox} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {text, touchOpacity} from '../../constants/sizes';
import {showCountryModal} from '../../redux/actions';
import {editClassified} from '../../redux/actions/classified';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import {map, remove, first} from 'lodash';
import widgetStyles from '../../components/widgets/widgetStyles';
import ClassifiedStorePropertiesWidget from '../../components/widgets/property/ClassifiedStorePropertiesWidget';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import BgContainer from '../../components/containers/BgContainer';

const ClassifiedEditScreen = ({navigation}) => {
  const {classified, auth, category, country, area, classifiedProps} =
    useSelector(state => state);
  const {colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const [name, setName] = useState(classified.name);
  const [mobile, setMobile] = useState(classified.mobile);
  const [price, setPrice] = useState(String(classified.price));
  const {params} = navigation.state;
  const [address, setAddress] = useState(classified.address);
  const [longitude, setLongitude] = useState(classified.longitude);
  const [latitude, setLatitude] = useState(classified.latitude);
  const [description, setDescription] = useState(classified.description);
  const [images, setImages] = useState(classified.images);
  const [image, setImage] = useState({path: classified.large});
  const [onlyWhatsapp, setOnlyWhatsapp] = useState(classified.only_whatsapp);
  const [sampleLogo, setSampleLogo] = useState('');

  const openPicker = useCallback(() => {
    return ImagePicker.openPicker({
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 1440,
      multiple: true,
      cropping: true,
      includeBase64: false,
      includeExif: false,
      maxFiles: 5,
      minFiles: 2,
      compressImageQuality: 0.5,
    }).then(elements => {
      setImage(first(elements));
      setImages(elements);
    });
  });

  const removeImage = useCallback(i => {
    const newImages = remove(images, (img, index) => i !== index);
    setImages(newImages);
  });

  useEffect(() => {
    if (validate.isEmpty(category)) {
      navigation.navigate('ChooseCategory');
    }
  }, [category]);

  return (
    <BgContainer>
      <KeyBoardContainer>
        <TouchableOpacity
          activeOpacity={touchOpacity}
          onPress={() => openPicker()}
          style={{width: '90%', marginTop: 0, alignItems: 'center'}}>
          <Icon
            name="camera"
            type="evilicon"
            color="lightgrey"
            size={90}
            containerStyle={{
              paddingTop: 10,
              margin: 15,
              width: 120,
              height: 120,
              borderRadius: 120 / 2,
              borderColor: 'lightgrey',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
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
              padding: 10,
            }}
            style={[
              widgetStyles.wrapper,
              {borderWidth: 1, borderColor: 'lightgrey', minHeight: 120},
            ]}>
            {map(images, (img, i) => (
              <ImageBackground
                key={i}
                source={{uri: img.path ? img.path : img.thumb}}
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
                    size={40}
                    name="ios-checkmark-circle"
                    type="ionicon"
                    color={img.path == image.path ? 'green' : 'black'}
                    onPress={() => setImage(img)}
                  />
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
        ) : null}
        <View style={{width: '90%', alignItems: 'center'}}>
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
            defaultValue={name}
            onChangeText={text => setName(text)}
            placeholder={I18n.t('classified_title')}
            label={I18n.t('classified_title')}
            labelStyle={{
              paddingBottom: 10,
              paddingTop: 10,
              fontFamily: text.font,
              textAlign: 'left',
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
            }}
            inputStyle={{
              fontFamily: text.font,
              textAlign: isRTL ? 'right' : 'left',
            }}
            shake={true}
            keyboardType="default"
            defaultValue={address}
            onChangeText={text => setAddress(text)}
            placeholder={I18n.t('address')}
            label={I18n.t('address')}
            labelStyle={{
              paddingBottom: 10,
              paddingTop: 10,
              fontFamily: text.font,
              textAlign: 'left',
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
              height: 80,
            }}
            inputStyle={{
              fontFamily: text.font,
              fontSize: 14,
              textAlign: isRTL ? 'right' : 'left',
            }}
            numberOfLines={3}
            shake={true}
            defaultValue={description}
            keyboardType="default"
            onChangeText={text => setDescription(text)}
            placeholder={description ? description : I18n.t('description')}
            label={I18n.t('description')}
            labelStyle={{
              paddingBottom: 10,
              paddingTop: 10,
              fontFamily: text.font,
              textAlign: 'left',
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
            }}
            inputStyle={{
              fontFamily: text.font,
              textAlign: isRTL ? 'right' : 'left',
            }}
            shake={true}
            keyboardType="number-pad"
            onChangeText={text => setMobile(text)}
            defaultValue={mobile}
            placeholder={mobile ? mobile : I18n.t('mobile')}
            label={I18n.t('mobile')}
            labelStyle={{
              paddingBottom: 10,
              paddingTop: 10,
              fontFamily: text.font,
              textAlign: 'left',
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
            }}
            inputStyle={{
              fontFamily: text.font,
              textAlign: isRTL ? 'right' : 'left',
            }}
            shake={true}
            keyboardType="number-pad"
            onChangeText={text => setPrice(text)}
            defaultValue={price}
            placeholder={I18n.t('price')}
            label={I18n.t('price')}
            labelStyle={{
              paddingBottom: 10,
              paddingTop: 10,
              fontFamily: text.font,
              textAlign: 'left',
            }}
          />
          <View
            style={{
              // marginTop: 0,
              marginBottom: 10,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CheckBox
              containerStyle={{width: '90%'}}
              title={I18n.t('only_whatsapp')}
              iconType="material"
              checkedIcon="check-box"
              uncheckedIcon="check-box-outline-blank"
              checked={onlyWhatsapp}
              onPress={() => setOnlyWhatsapp(!onlyWhatsapp)}
              textStyle={{fontFamily: text.font, paddingTop: 5}}
            />
          </View>
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
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontFamily: text.font,
                  fontSize: text.large,
                  textAlign: isRTL ? 'right' : 'left',
                  color: colors.main_theme_color,
                }}>
                {I18n.t('area')} {area ? area.slug : I18n.t('choose_area')}
              </Text>
            </TouchableOpacity>
          ) : null}
          {!validate.isEmpty(classifiedProps) ? (
            <ClassifiedStorePropertiesWidget
              elements={classifiedProps}
              name={category.name}
            />
          ) : null}
        </View>
        <Button
          raised
          containerStyle={{marginBottom: 10, marginTop: 10, width: '90%'}}
          buttonStyle={{
            backgroundColor: colors.btn_bg_theme_color,
            borderRadius: 0,
          }}
          titleStyle={{
            fontFamily: text.font,
            color: colors.btn_text_theme_color,
          }}
          title={I18n.t('save_classified')}
          onPress={() =>
            dispatch(
              editClassified({
                user_id: auth.id,
                api_token: auth.api_token,
                name,
                address,
                longitude,
                latitude,
                description,
                mobile,
                price,
                country_id: country.id,
                area_id: area ? area.id : null,
                image,
                images,
                classifiedProps,
                category_id: category.id,
                only_whatsapp: onlyWhatsapp ? 1 : 0,
              }),
            )
          }
        />
      </KeyBoardContainer>
    </BgContainer>
  );
};

export default ClassifiedEditScreen;

const styles = StyleSheet.create({});
