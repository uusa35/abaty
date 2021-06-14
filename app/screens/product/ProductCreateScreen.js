import React, {useState, useContext, Fragment, useMemo} from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import I18n, {isRTL} from '../../I18n';
import {
  bottomContentInset,
  text,
  height,
  iconSizes,
  formWidget,
} from '../../constants/sizes';
import {icons} from '../../constants/images';
import {
  enableErrorMessage,
  showCountryModal,
  submitCreateNewProduct,
} from '../../redux/actions';
import {companyRegister, register, submitAuth} from '../../redux/actions/user';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import {useDispatch, useSelector} from 'react-redux';
import {filter, first, map, remove, flatten, uniq, forEach} from 'lodash';
import ImageLoaderContainer from '../../components/widgets/ImageLoaderContainer';
import ImagePicker from 'react-native-image-crop-picker';
import widgetStyles from '../../components/widgets/widgetStyles';
import validate from 'validate.js';
import {
  validateCreateProduct,
  validateSubmitRegister,
} from '../../constants/validations';
import KeyBoardContainer from '../../components/containers/KeyBoardContainer';
import {useNavigation} from '@react-navigation/native';
import DesigneratBtn from '../../components/widgets/Button/DesigneratBtn';
import {themeColors} from '../../constants/colors';
import BgContainer from '../../components/containers/BgContainer';
import Actionsheet from 'react-native-enhanced-actionsheet';
import {convertNumberToEnglish} from '../../helpers';

const ProductCreateScreen = ({showLabel = false}) => {
  const {colors, logo} = useContext(GlobalValuesContext);
  const {categories, auth} = useSelector(state => state);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [name, setName] = useState('dsfdsf');
  const [sku, setSku] = useState('343');
  const [price, setPrice] = useState('11');
  const [qty, setQty] = useState('10');
  const [weight, setWeight] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const [description, setDescription] = useState('dsfdsfdsfdsf');
  const [image, setImage] = useState(null);
  const [images, setImages] = useState();
  const [finalCategories, setFinalCategories] = useState([]);

  useMemo(() => {
    const finalcategories = [];
    map(categories, c => {
      if (c.isParent) {
        finalcategories.push({
          id: c.id,
          label: c.name,
        });
      }
      if (c.isParent && c.has_children) {
        map(c.children, child => {
          finalcategories.push({
            id: child.id,
            label: child.name,
          });
        });
      }
    });
    setFinalCategories(flatten(finalcategories));
  }, []);

  const openLogoPicker = () => {
    return ImagePicker.openPicker({
      width: 1080,
      height: 1440,
      multiple: false,
      cropping: true,
      freeStyleCropEnabled: true,
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

  const openImagesPicker = async () => {
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
    }).then(async images => {
      const result = [];
      for (const img of images) {
        result.push(
          await ImagePicker.openCropper({
            path: img.path,
            width: 1080,
            height: 1440,
          }),
        );
      }
      setImages(result);
    });
  };

  const removeImage = i => {
    const newImages = remove(images, (img, index) => i !== index);
    setImages(newImages);
  };

  const handleSubmitNewProduct = () => {
    return validateCreateProduct
      .validate({
        name,
        sku,
        price,
        qty,
        categories: selectedCategories,
        user_id: auth.id,
        description,
        image,
        images,
      })
      .then(r => {
        return dispatch(
          submitCreateNewProduct({
            name,
            sku,
            price,
            qty,
            categories: selectedCategories,
            description,
            image,
            images,
            api_token: auth.api_token,
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
  };

  return (
    <BgContainer showImage={false} white={false}>
      <KeyBoardContainer>
        <View
          style={{
            flex: 1,
            marginTop: '10%',
            backgroundColor: 'transparent',
            marginLeft: 5,
            marginRight: 5,
          }}>
          <Text
            style={[
              widgetStyles.headerTow,
              {marginBottom: '10%', textAlign: 'left', marginLeft: 10},
            ]}>
            {I18n.t('main_details')}
          </Text>
          <Input
            placeholder="0052212"
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={I18n.t('sku') + '*'}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={text => setSku(text)}
          />
          <Input
            placeholder={I18n.t('tshirt')}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={I18n.t('name_ar') + '*'}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={text => setName(text)}
          />
          <Input
            placeholder={I18n.t('price')}
            containerStyle={{maxHeight: 100}}
            maxLength={4}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={I18n.t('price') + '*'}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="numeric"
            onChangeText={text => setPrice(convertNumberToEnglish(text))}
          />
          <Input
            placeholder={I18n.t('qty')}
            containerStyle={{maxHeight: 100}}
            maxLength={4}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={I18n.t('qty') + '*'}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="numeric"
            onChangeText={text => setQty(convertNumberToEnglish(text))}
          />
          <Input
            placeholder={I18n.t('product_description')}
            containerStyle={{maxHeight: 100}}
            inputContainerStyle={[widgetStyles.inputContainerStyle]}
            inputStyle={widgetStyles.inputStyle}
            label={I18n.t('description') + '*'}
            labelStyle={[
              styles.titleLabelStyle,
              {color: colors.main_theme_color, paddingBottom: 10},
            ]}
            shake={true}
            keyboardType="default"
            onChangeText={text => setDescription(convertNumberToEnglish(text))}
          />
          <View style={{marginLeft: 10, marginRight: 10}}>
            <Text
              style={[
                widgetStyles.headerThree,
                {textAlign: 'left', marginBottom: 10, marginLeft: 10},
              ]}>
              {I18n.t('categories')}*
            </Text>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.9,
                  alignSelf: 'center',
                  borderWidth: 1,
                  borderColor: 'lightgrey',
                  borderRadius: 5,
                  height: 55,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
                onPress={() => setCategoryVisible(true)}>
                <Text style={widgetStyles.headerThree}>
                  {selectedCategories.length >= 1
                    ? `${I18n.t('choosen_categories')} (${
                        selectedCategories.length
                      })`
                    : I18n.t('choose_category')}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  alignSelf: 'center',
                  flex: 0.1,
                  height: 55,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name="redo"
                  type="evilicon"
                  size={iconSizes.small}
                  hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
                  onPress={() => setSelectedCategories([])}
                />
              </View>
            </View>
          </View>
          <Text
            style={[
              styles.titleLabelStyle,
              {
                color: colors.main_theme_color,
                marginTop: 20,
                paddingLeft: 15,
              },
            ]}>
            {I18n.t('main_image')}
          </Text>
          <View style={{backgroundColor: 'white', borderRadius: 5, margin: 15}}>
            <TouchableOpacity
              onPress={() => openLogoPicker()}
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 20,
                marginBottom: 20,
              }}>
              <ImageLoaderContainer
                img={image && image.path ? image.path : logo}
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
                {I18n.t('main_image')}
              </Text>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.titleLabelStyle,
              {
                color: colors.main_theme_color,
                marginTop: 20,
                paddingLeft: 15,
              },
            ]}>
            {I18n.t('more_images')}
          </Text>
          <View style={{backgroundColor: 'white', borderRadius: 5, margin: 15}}>
            <TouchableOpacity
              onPress={() => openImagesPicker()}
              style={{width: '100%', marginTop: 0, alignItems: 'center'}}>
              {validate.isEmpty(first(images)) && (
                <ImageLoaderContainer
                  img={first(images) ? first(images).path : logo}
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
          </View>

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
                      type="evilicon"
                      onPress={() => removeImage(i)}
                    />
                  </View>
                </ImageBackground>
              ))}
            </ScrollView>
          )}

          <DesigneratBtn
            handleClick={() => handleSubmitNewProduct()}
            marginTop={20}
            title={I18n.t('submit')}
          />
        </View>
        <Actionsheet
          visible={categoryVisible}
          data={finalCategories}
          title={I18n.t('choose')}
          selected={selectedCategories}
          onOptionPress={e => {
            setSelectedCategories(uniq(selectedCategories.concat(e.id)));
          }}
          optionTextStyle={widgetStyles.headerThree}
          titleStyle={widgetStyles.headerThree}
          onCancelPress={() => setCategoryVisible(false)}
          cancelBtnText={I18n.t('cancel')}
          cancelTextStyle={widgetStyles.headerThree}
        />
      </KeyBoardContainer>
    </BgContainer>
  );
};

export default React.memo(ProductCreateScreen);

ProductCreateScreen.propTypes = {};

const styles = StyleSheet.create({
  titleLabelStyle: {
    fontFamily: text.font,
    fontSize: text.medium,
    fontWeight: 'normal',
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'left',
  },
});
