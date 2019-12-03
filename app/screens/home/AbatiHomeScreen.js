import React, {useState, useEffect, useCallback} from 'react';
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
  setDeepLinking,
  setPlayerId,
} from '../../redux/actions';
import {isIOS} from '../../constants';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import {
  ABATI_ONE_SIGNAL_APP_ID,
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
import ServiceHorizontalWidget from '../../components/widgets/service/ServiceHorizontalWidget';
import DesignerHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import CelebrityHorizontalWidget from '../../components/widgets/user/CelebrityHorizontalWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from '../../I18n';
import ProductSearchForm from '../../components/widgets/search/ProductSearchForm';

const AbatiHomeScreen = ({
  homeCategories,
  bootStrapped,
  commercials,
  slides,
  splashes,
  brands,
  homeDesigners,
  homeCelebrities,
  homeProducts,
  splash_on,
  show_commercials,
  colors,
  services,
  showIntroduction,
  dispatch,
  navigation,
  linking,
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
    OneSignal.init(ABATI_ONE_SIGNAL_APP_ID);
    OneSignal.addEventListener('received', onReceived);
    OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    //OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    Linking.addEventListener('url', handleOpenURL);
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      : null;
  }, [bootStrapped]);

  const handleBackPress = useCallback(() => {
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
  });

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        // __DEV__ ? console.log('HERE NOW') : null;
      } else {
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
      dispatch(goDeepLinking());
    }, 2000);
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
        <ProductSearchForm />
        {!validate.isEmpty(slides) ? (
          <MainSliderWidget slides={slides} />
        ) : null}
        {!validate.isEmpty(homeDesigners) && validate.isArray(homeDesigners) ? (
          <DesignerHorizontalWidget
            elements={homeDesigners}
            showName={true}
            name={I18n.t('designers')}
            title={I18n.t('designers')}
            searchElements={{is_designer: true}}
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
        {!validate.isEmpty(homeCelebrities) &&
        validate.isArray(homeCelebrities) ? (
          <CelebrityHorizontalWidget
            elements={homeCelebrities}
            showName={true}
            name="celebrities"
            title={I18n.t('celebrities')}
            searchElements={{is_celebrity: true}}
          />
        ) : null}
        {!validate.isEmpty(homeProducts) ? (
          <ProductHorizontalWidget
            elements={homeProducts}
            showName={true}
            title={I18n.t('featured_products')}
          />
        ) : null}
        {!validate.isEmpty(brands) && validate.isArray(brands) ? (
          <BrandHorizontalWidget
            elements={brands}
            showName={false}
            title={I18n.t('brands')}
          />
        ) : null}
        {!validate.isEmpty(services) ? (
          <ServiceHorizontalWidget
            elements={services}
            showName={true}
            title={I18n.t('our_services')}
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
    colors: state.settings.colors,
    lang: state.lang,
    services: state.services,
    showIntroduction: state.showIntroduction,
    homeCompanies: state.homeCompanies,
    bootStrapped: state.bootStrapped,
    linking: state.linking,
  };
}

export default connect(mapStateToProps)(AbatiHomeScreen);

AbatiHomeScreen.propTypes = {
  homeCategories: PropTypes.array,
  brands: PropTypes.array,
  homeDesigners: PropTypes.array,
  homeProducts: PropTypes.array,
  commercials: PropTypes.array,
  slides: PropTypes.array,
  splashes: PropTypes.array,
  show_commercials: PropTypes.bool,
  splash_on: PropTypes.bool,
  bootStrapped: PropTypes.bool,
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
