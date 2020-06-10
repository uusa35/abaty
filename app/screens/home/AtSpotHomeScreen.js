import React, {
  useState,
  useMemo,
  useEffect,
  useCallback,
  Fragment,
} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
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
  ATSPOT,
  APP_CASE,
  pusherEnabled,
} from './../../../app.json';
import {getPathForDeepLinking} from '../../helpers';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import CollectionHorizontalWidget from '../../components/widgets/collection/CollectionHorizontalWidget';
import CompanyHorizontalWidget from '../../components/widgets/user/CompanyHorizontalWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from './../../I18n';
import ShopperHorizontalWidget from '../../components/widgets/user/ShopperHorizontalWidget';
import {channel} from '../../env';
import {Button} from 'react-native-elements';
import {axiosInstance} from '../../redux/actions/api';

const AtSpotHomeScreen = ({
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
  [device, setDevice] = useState('');
  [deviceId, setDeviceId] = useState('');
  const [currentData, setCurrentData] = useState('');

  useEffect(() => {
    //OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    Linking.addEventListener('url', handleOpenURL);
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      : null;
    if (ATSPOT) {
      OneSignal.init(MALLR_ONE_SIGNAL_APP_ID);
      OneSignal.addEventListener('received', onReceived);
      OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);
      if (__DEV__) {
        channel
          .bind('pusher:subscription_succeeded', (d) => {
            // console.log('channel subscripted succesffully', d);
          })
          .bind('pusher:subscription_error', (d) => {
            // console.log('the d from error', d);
          });
      }
    }
  });

  const handlePusher = useCallback((id) => {
    return axiosInstance
      .post(`map/event`, {message: `From ${APP_CASE}`, id})
      .then((r) => {
        if (r.data) {
          setCurrentData(r.data);
        } else {
          setCurrentData({});
        }
      })
      .catch((e) => e);
  });

  useMemo(() => {
    if (!validate.isEmpty(currentData) && pusherEnabled) {
      channel.bind(`my-event-${currentData.id}`, (data) => {
        alert(JSON.stringify(data));
      });
    }
  }, [currentData]);

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  const handleBackPress = useCallback(() => {
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
  });

  const handleOpenURL = useCallback((event) => {
    const {type, id} = getPathForDeepLinking(event.url);
    return dispatch(goDeepLinking({type, id}));
  });

  const onReceived = useCallback((notification) => {
    // __DEV__ ? console.log('Notification received: ', notification) : null;
  });

  const onOpened = useCallback((openResult) => {
    if (__DEV__) {
      // console.log('the whole thing', openResult.notification.payload);
      // console.log('Message: ', openResult.notification.payload.body);
      // console.log('Data: ', openResult.notification.payload.additionalData);
      // console.log('isActive: ', openResult.notification.isAppInFocus);
      // console.log('openResult: ', openResult.notification.payload.launchURL);
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
    (device) => {
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
        {__DEV__ ? (
          <Fragment>
            <Button
              onPress={() => handlePusher(10)}
              raised
              containerStyle={{margin: 10}}
              title="Fire Channel 10"></Button>
            <Button
              onPress={() => handlePusher(11)}
              raised
              containerStyle={{margin: 10}}
              title="Fire Channel 11"></Button>
          </Fragment>
        ) : null}

        {!validate.isEmpty(slides) ? (
          <MainSliderWidget slides={slides} />
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

export default connect(mapStateToProps)(AtSpotHomeScreen);

AtSpotHomeScreen.propTypes = {
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
