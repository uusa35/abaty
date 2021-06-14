import React, {useMemo, useState} from 'react';
import {
  FlatList,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  Modal,
  SafeAreaView,
  View,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import I18n from '../../I18n';
import ExpoMainSliderWidget from '../../components/widgets/slider/ExpoMainSliderWidget';
import ExpoDesignerHorizontalWidget from '../../components/widgets/user/ExpoDesignerHorizontalWidget';
import BgContainer from '../../components/containers/BgContainer';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';
import {bottomContentInset} from '../../constants/sizes';
import widgetStyles from '../../components/widgets/widgetStyles';
import FastImage from 'react-native-fast-image';
import {width} from '../../constants';
import {icons} from '../../constants/images';
import {setCategory} from '../../redux/actions/category';
import {getSearchCompanies} from '../../redux/actions/user';
import {themeColors} from '../../constants/colors';
import {Icon} from 'react-native-elements';
import {iconSizes} from '../../constants/sizes';
import {useNavigation} from '@react-navigation/native';
import {some, includes} from 'lodash';
import CompanySearchForm from '../../components/widgets/search/CompanySearchForm';

const IhousesHomeScreen = () => {
  const {
    homeCategories,
    homeUserCategories,
    commercials,
    slides,
    brands,
    homeDesigners,
    homeCelebrities,
    homeProducts,
    bestSaleProducts,
    latestProducts,
    hotDealsProducts,
    homeCompanies,
    splashes,
    services,
    showIntroduction,
    mainBg,
    country,
    settings,
    category,
  } = useSelector(state => state);
  const [toggleVisible, setToggleVisible] = useState(false);
  const dispatch = useDispatch();
  const navigaiton = useNavigation();
  const handleRefresh = () => dispatch(refetchHomeElements());
  const handleClick = c => {
    setToggleVisible(true);
    dispatch(setCategory(c));
  };

  const handleSearch = params => {
    setToggleVisible(false);
    return dispatch(getSearchCompanies({searchParams: params, redirect: true}));
  };

  const handlePdfView = pdfLink => {
    setToggleVisible(false);
    return navigaiton.navigate('PdfView', {pdfLink, name: category.name});
  };

  return (
    <BgContainer showImage={false} white={false}>
      <AppHomeConfigComponent />
      {settings.splash_on && (
        <IntroductionWidget
          elements={splashes}
          IntroductionWidget
          showIntroduction={showIntroduction}
        />
      )}
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'transparent',
        }}
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        endFillColor="white"
        style={{
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => handleRefresh()}
          />
        }>
        <CompanySearchForm />
        <ExpoMainSliderWidget elements={slides} />
        <FlatList
          horizontal={false}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
            alignSelf: 'center',
            marginTop: 10,
            marginBottom: 10,
          }}
          style={{flex: 1, backgroundColor: 'white', margin: 20}}
          contentContainerStyle={{
            padding: 10,
            width: '100%',
            backgroundColor: themeColors.desinerat.white,
            borderRadius: 10,
          }}
          data={homeCategories}
          renderItem={({item, i}) => (
            <Pressable
              onPress={() => handleClick(item)}
              style={{
                justifyContent: 'center',
                alignContent: 'center',
                width: '100%',
                flex: 1,
              }}>
              <FastImage
                resizeMode={'contain'}
                source={{uri: item.thumb}}
                style={{
                  width: '100%',
                  height: width / 3.8,
                  marginBottom: 10,
                  borderRadius: 10,
                }}
              />
              <Text style={[widgetStyles.headerFour, {textAlign: 'center'}]}>
                {item.name}
              </Text>
            </Pressable>
          )}
        />
        <Modal
          transparent={true}
          visible={toggleVisible}
          animationType={'slide'}
          presentationStyle="overFullScreen">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.8)',
            }}>
            <SafeAreaView />
            <Pressable
              onPress={() => setToggleVisible(false)}
              style={{
                flex: 0.3,
                paddingRight: 50,
                paddingTop: 50,
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}>
              <Icon
                name={'close'}
                type={'antdesign'}
                color={'white'}
                size={iconSizes.small}
              />
            </Pressable>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 0.2,
              }}>
              <Pressable
                style={{
                  width: width / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => handleSearch({user_category_id: category.id})}>
                <FastImage
                  source={icons.homeTwo}
                  style={{width: 80, height: 80, margin: 10, marginBottom: 15}}
                  resizeMode={'contain'}
                  tintColor={'white'}
                />
                <Text
                  style={[
                    widgetStyles.headerThree,
                    {color: 'white', fontWeight: 'bold', textAlign: 'center'},
                  ]}>
                  {I18n.t('companies')}
                </Text>
              </Pressable>
              {includes(category.path, 'pdf') && (
                <Pressable
                  style={{
                    width: width / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  disabled={!includes(category.path, 'pdf')}
                  onPress={() => handlePdfView(category.path)}>
                  <FastImage
                    source={icons.categoriesSecond}
                    style={{
                      width: 80,
                      height: 80,
                      margin: 10,
                      marginBottom: 15,
                    }}
                    resizeMode={'contain'}
                    tintColor={'white'}
                  />
                  <Text
                    style={[
                      widgetStyles.headerThree,
                      {
                        color: 'white',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        width: 150,
                      },
                    ]}>
                    {I18n.t('recommendations_and_information')}
                  </Text>
                </Pressable>
              )}
            </View>
            <Pressable
              onPress={() => setToggleVisible(false)}
              style={{flex: 0.4, width: '100%'}}></Pressable>
          </View>
        </Modal>
      </ScrollView>
    </BgContainer>
  );
};

export default IhousesHomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
