import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  AppState,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setPlayerId,
} from '../redux/actions';
import {isIOS} from '../constants';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import {
  ONE_SIGNAL_APP_ID,
  ABATI,
  MALLR,
  HOMEKEY,
  ESCRAP,
} from './../../app.json';
import {getPathForDeepLinking} from '../helpers';
import FixedCommercialSliderWidget from '../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../components/widgets/MainSliderWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../components/widgets/brand/BrandHorizontalWidget';
import ProductHorizontalWidget from '../components/widgets/product/ProductHorizontalWidget';
import IntroductionWidget from '../components/widgets/splash/IntroductionWidget';
import ServiceHorizontalWidget from '../components/widgets/service/ServiceHorizontalWidget';
import CollectionHorizontalWidget from '../components/widgets/collection/CollectionHorizontalWidget';
import DesignersHorizontalWidget from '../components/widgets/user/DesignerHorizontalWidget';
import CompanyHorizontalWidget from '../components/widgets/user/CompanyHorizontalWidget';
import CelebrityHorizontalWidget from '../components/widgets/user/CelebrityHorizontalWidget';
import ProductCategoryHorizontalRoundedWidget from '../components/widgets/category/ProductCategoryHorizontalRoundedWidget';

const HomeScreen = ({
  homeCategories,
  commercials,
  slides,
  splashes,
  brands,
  homeDesigners,
  homeCelebrities,
  homeProducts,
  homeCollections,
  splash_on,
  show_commercials,
  colors,
  services,
  showIntroduction,
  homeCompanies,
  dispatch,
  navigation,
}) => {
  [refresh, setRefresh] = useState(false);
  [appState, setAppState] = useState(AppState.currentState);
  [device, setDevice] = useState('');
  [deviceId, setDeviceId] = useState('');

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    OneSignal.init(ONE_SIGNAL_APP_ID);
    // OneSignal.addEventListener('received', onReceived);
    // OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    Linking.addEventListener('url', handleOpenURL);

    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      : null;
  });

  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // __DEV__ ? console.log('HERE NOW') : null;
      }
      setAppState(nextAppState);
    },
    [appState],
  );

  const handleBackPress = useCallback(() => {
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
  });

  const handleOpenURL = (event) => {
    const {type, id} = getPathForDeepLinking(event.url);
    return this.props.dispatch(goDeepLinking({type, id}));
  };

  // const onReceived = useCallback((notification) => {
  //   __DEV__ ? console.log('Notification received: ', notification) : null;
  // },[notification]);

  const onOpened = (openResult) => {
    if (__DEV__) {
      // console.log('the whole thing', openResult.notification.payload);
      // console.log('Message: ', openResult.notification.payload.body);
      // console.log('Data: ', openResult.notification.payload.additionalData);
      // console.log('isActive: ', openResult.notification.isAppInFocus);
      // console.log('openResult: ', openResult.notification.payload.launchURL);
    }
    const {path, params} = getPathForDeepLinking(
      openResult.notification.payload.additionalData.url,
    );
    dispatch(goDeepLinking(path, params));
  };

  const onIds = (device) => {
    setDeviceId(device.userId);
    if (device.userId !== deviceId) {
      dispatch(setPlayerId(device.userId));
    }
  };

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
        {!validate.isEmpty(homeDesigners) &&
        validate.isArray(homeDesigners) &&
        (ABATI || MALLR) ? (
          <DesignersHorizontalWidget
            elements={homeDesigners}
            showName={true}
            name="designers"
            title="designers"
            searchElements={{is_designer: true}}
          />
        ) : null}
        {MALLR ? (
          <CompanyHorizontalWidget
            elements={homeCompanies}
            showName={true}
            name="companies"
            title="companies"
            searchElements={{is_company: true}}
          />
        ) : null}
        {!validate.isEmpty(homeCategories) &&
        validate.isArray(homeCategories) &&
        (ABATI || MALLR) ? (
          <ProductCategoryHorizontalRoundedWidget
            elements={homeCategories}
            showName={true}
            title="categories"
            type="products"
          />
        ) : null}
        {!validate.isEmpty(homeCelebrities) &&
        validate.isArray(homeCelebrities) &&
        ABATI ? (
          <CelebrityHorizontalWidget
            elements={homeCelebrities}
            showName={true}
            name="celebrities"
            title="celebrities"
            searchElements={{is_celebrity: true}}
          />
        ) : null}
        {!validate.isEmpty(homeProducts) && (ABATI || MALLR) ? (
          <ProductHorizontalWidget
            elements={homeProducts}
            showName={true}
            title="featured_products"
          />
        ) : null}
        {!validate.isEmpty(brands) &&
        validate.isArray(brands) &&
        (ABATI || MALLR) ? (
          <BrandHorizontalWidget
            elements={brands}
            showName={false}
            title="brands"
          />
        ) : null}
        {!validate.isEmpty(services) && ABATI ? (
          <ServiceHorizontalWidget
            elements={services}
            showName={true}
            title="our_services"
          />
        ) : null}
        {!validate.isEmpty(homeCollections) && MALLR ? (
          <CollectionHorizontalWidget
            elements={homeCollections}
            showName={true}
            title="our_collections"
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
    homeProducts: state.homeProducts,
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

export default connect(mapStateToProps)(HomeScreen);

HomeScreen.propTypes = {
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
