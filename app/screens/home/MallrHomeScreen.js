import React, {
  Component,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  AppState,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setDeepLinking,
  setPlayerId,
} from '../../redux/actions';
import {isIOS} from '../../constants';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import {
  MALLR_ONE_SIGNAL_APP_ID,
  ABATI,
  MALLR,
  HOMEKEY,
  ESCRAP,
} from './../../../app.json';
import {getPathForDeepLinking} from '../../helpers';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/MainSliderWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import CollectionHorizontalWidget from '../../components/widgets/collection/CollectionHorizontalWidget';
import CompanyHorizontalWidget from '../../components/widgets/user/CompanyHorizontalWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from './../../I18n';
import ShopperHorizontalWidget from '../../components/widgets/user/ShopperHorizontalWidget';

const MallrHomeScreen = ({
  homeCategories,
  commercials,
  slides,
  splashes,
  brands,
  homeDesigners,
  bestSaleProducts,
  latestProducts,
  hotDealsProducts,
  onSaleProducts,
  homeCollections,
  splash_on,
  show_commercials,
  colors,
  showIntroduction,
  homeCompanies,
  dispatch,
  navigation,
}) => {
  [refresh, setRefresh] = useState(false);
  [appState, setAppState] = useState(AppState.currentState);
  [device, setDevice] = useState('');
  [deviceId, setDeviceId] = useState('');

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    if (MALLR) {
      OneSignal.init(MALLR_ONE_SIGNAL_APP_ID);
      OneSignal.addEventListener('received', onReceived);
      OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);
    }
    //OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    Linking.addEventListener('url', handleOpenURL);

    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      : null;
  });

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  const handleBackPress = useCallback(() => {
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
  });

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        if (__DEV__) {
          console.log('APP STATE ACTIVE');
        }
      }
      setAppState(nextAppState);
    },
    [appState],
  );

  const handleOpenURL = useCallback(event => {
    const {type, id} = getPathForDeepLinking(event.url);
    return dispatch(goDeepLinking({type, id}));
  });

  const onReceived = useCallback(notification => {
    __DEV__ ? console.log('Notification received: ', notification) : null;
  });

  const onOpened = useCallback(openResult => {
    if (__DEV__) {
      console.log('the whole thing', openResult.notification.payload);
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult.notification.payload.launchURL);
    }
    const notification = getPathForDeepLinking(
      openResult.notification.payload.launchURL,
    );
    dispatch(setDeepLinking(notification));
    setTimeout(() => {
      dispatch(goDeepLinking(notification));
    }, 1000);
  });

  const onIds = useCallback(
    device => {
      setDeviceId(device.userId);
      if (device.userId !== deviceId) {
        dispatch(setPlayerId(device.userId));
      }
    },
    [deviceId],
  );

  useMemo(() => {}, [deviceId]);

  return (
    <View style={{flex: 1, backgroundColor: colors.main_theme_bg_color}}>
      {!validate.isEmpty(splashes) && splash_on && __DEV__ ? (
        <IntroductionWidget
          elements={splashes}
          showIntroduction={showIntroduction}
        />
      ) : null}
      <ScrollView
        contentContainerStyle={{backgroundColor: 'transparent'}}
        contentInset={{bottom: 50}}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }
        showsHorizontalScrollIndicator={false}
        endFillColor="white"
        showsVerticalScrollIndicator={false}
        style={{flex: 0.8}}>
        {!validate.isEmpty(slides) ? (
          <MainSliderWidget slides={slides} />
        ) : null}
        {!validate.isEmpty(homeDesigners) && validate.isArray(homeDesigners) ? (
          <ShopperHorizontalWidget
            elements={homeDesigners}
            showName={true}
            name={I18n.t('mallr.personal_shoppers')}
            title={I18n.t('mallr.personal_shoppers')}
            searchElements={{is_designer: true}}
          />
        ) : null}
        {!validate.isEmpty(homeCompanies) && validate.isArray(homeCompanies) ? (
          <CompanyHorizontalWidget
            elements={homeCompanies}
            showName={true}
            name="companies"
            title={I18n.t('mallr.our_companies')}
            searchElements={{is_company: true}}
          />
        ) : null}
        {!validate.isEmpty(homeCategories) &&
        validate.isArray(homeCategories) ? (
          <ProductCategoryHorizontalRoundedWidget
            elements={homeCategories}
            showName={true}
            title={I18n.t('categories')}
            type="products"
          />
        ) : null}
        {!validate.isEmpty(latestProducts) ? (
          <ProductHorizontalWidget
            elements={latestProducts}
            showName={true}
            title={I18n.t('latest_products')}
            showLink={false}
          />
        ) : null}
        {!validate.isEmpty(onSaleProducts) ? (
          <ProductHorizontalWidget
            elements={onSaleProducts}
            showName={true}
            title={I18n.t('on_sale_products')}
            showLink={false}
          />
        ) : null}
        {!validate.isEmpty(bestSaleProducts) ? (
          <ProductHorizontalWidget
            elements={bestSaleProducts}
            showName={true}
            title={I18n.t('best_sale_products')}
            showLink={false}
          />
        ) : null}
        {!validate.isEmpty(hotDealsProducts) ? (
          <ProductHorizontalWidget
            elements={hotDealsProducts}
            showName={true}
            title={I18n.t('hot_deals_products')}
            showLink={false}
          />
        ) : null}
        {!validate.isEmpty(brands) && validate.isArray(brands) ? (
          <BrandHorizontalWidget
            elements={brands}
            showName={false}
            title={I18n.t('brands')}
          />
        ) : null}
        {!validate.isEmpty(homeCollections) ? (
          <CollectionHorizontalWidget
            elements={homeCollections}
            showName={true}
            title={I18n.t('our_collections')}
          />
        ) : null}
      </ScrollView>
      {show_commercials ? (
        <View style={{flex: 0.2}}>
          {!validate.isEmpty(commercials) ? (
            <FixedCommercialSliderWidget sliders={commercials} />
          ) : null}
        </View>
      ) : null}
    </View>
  );
};

function mapStateToProps(state) {
  return {
    homeCategories: state.homeCategories,
    brands: state.brands,
    homeDesigners: state.homeDesigners,
    homeCelebrities: state.homeCelebrities,
    bestSaleProducts: state.bestSaleProducts,
    latestProducts: state.latestProducts,
    hotDealsProducts: state.hotDealsProducts,
    onSaleProducts: state.onSaleProducts,
    commercials: state.commercials,
    slides: state.slides,
    splashes: state.splashes,
    logo: state.settings.logo,
    splash_on: state.settings.splash_on,
    show_commercials: state.settings.show_commercials,
    network: state.network,
    colors: state.settings.colors,
    lang: state.lang,
    services: state.services,
    homeCollections: state.homeCollections,
    showIntroduction: state.showIntroduction,
    homeCompanies: state.homeCompanies,
  };
}

export default connect(mapStateToProps)(MallrHomeScreen);

MallrHomeScreen.propTypes = {
  homeCategories: PropTypes.array,
  brands: PropTypes.array,
  homeDesigners: PropTypes.array,
  homeProducts: PropTypes.array,
  homeCollections: PropTypes.array,
  commercials: PropTypes.array,
  slides: PropTypes.array,
  splashes: PropTypes.array,
  show_commercials: PropTypes.bool,
  splash_on: PropTypes.bool,
};

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
