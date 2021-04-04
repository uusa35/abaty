import React, {useEffect, useState, Fragment, useMemo} from 'react';
import {AppState, useColorScheme, StatusBar, Text} from 'react-native';
import codePush from 'react-native-code-push';
import {useDispatch, useSelector} from 'react-redux';
import {appBootstrap} from './redux/actions';
import {AppNavigator} from './AppNavigator';
import validate from 'validate.js';
import AlertMessage from './components/AlertMessage';
import CountriesList from './components/Lists/CountriesList';
import {GlobalValuesContext} from './redux/GlobalValuesContext';
import {axiosInstance} from './redux/actions/api';
import LoginScreenModal from './screens/auth/LoginScreenModal';
import AreasList from './components/Lists/AreasList';
import SimpleSpinner from './components/SimpleSpinner';
import ProductFilterModal from './screens/product/ProductFilterModal';
import LoadingOfflineView from './components/Loading/LoadingOfflineView';
import {useNetInfo} from '@react-native-community/netinfo';
import {TOGGLE_BOOTSTRAPPED} from './redux/actions/types';
import DeviceInfo from 'react-native-device-info';
import OldVersionComponent from './components/widgets/OldVersionComponenet';
import {minOldVersionApple, minOldVersionAndroid} from './../app';
import {isIOS} from './constants';

const App = () => {
  const colorScheme = useColorScheme();
  const {
    bootStrapped,
    message,
    countries,
    country,
    area,
    areas,
    areaModal,
    logo,
    cart,
    total,
    grossTotal,
    token,
    loginModal,
    searchModal,
    lang,
    currency,
    resetApp,
    settings,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [appState, setAppState] = useState(AppState.currentState);
  const {isConnected} = useNetInfo();

  useEffect(() => {
    if (!validate.isEmpty(token) && token.length > 5) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    axiosInstance.defaults.headers['currency'] = currency;
    axiosInstance.defaults.headers.common['currency'] = currency;
    axiosInstance.defaults.headers['country'] = country.name;
    axiosInstance.defaults.headers.common['country'] = country.name;
  }, [lang]);

  useEffect(() => {
    if (appState === 'background' && resetApp) {
    } else {
    }
  }, [appState]);

  useEffect(() => {
    codePush.sync({installMode: codePush.InstallMode.IMMEDIATE});
    codePush.checkForUpdate().then((update) => {
      if (!update) {
        // console.warn('====> The app is up to date!');
      } else {
        if (__DEV__) {
          // console.warn('===> there is an update here');
        }
      }
    });
    AppState.addEventListener('change', handleAppStateChange);
    if (!bootStrapped) {
      dispatch(appBootstrap());
    }
  }, []);

  useMemo(() => {
    if (!bootStrapped) {
      setTimeout(() => {
        dispatch({type: TOGGLE_BOOTSTRAPPED, payload: true});
      }, 5000);
    }
  }, [bootStrapped]);

  useEffect(() => {
    if (isConnected) {
      dispatch(appBootstrap());
    }
  }, [isConnected]);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
    }
    setAppState(nextAppState);
  };

  return (
    <Fragment>
      {isConnected ? (
        <Fragment>
          {validate.isEmpty(settings) && settings.colors && (
            <StatusBar
              barStyle={isIOS ? `dark-content` : `light-content`}
              backgroundColor={settings.colors.btn_bg_theme_color}
            />
          )}
          {bootStrapped ? (
            <GlobalValuesContext.Provider
              value={{
                cartLength: cart.length,
                countriesLength: countries.length,
                currency_symbol: country
                  ? country.currency.currency_symbol
                  : 'KWD',
                exchange_rate: country ? country.currency.exchange_rate : '1',
                total,
                grossTotal,
                colors: settings.colors,
                logo: settings.logo,
                app_logo: settings.app_logo,
                mainBg: settings.main_bg,
                searchModal,
                resetApp,
                lang,
              }}>
              <React.Suspense fallback={<SimpleSpinner />}>
                {DeviceInfo.getVersion() >=
                (isIOS ? minOldVersionApple : minOldVersionAndroid) ? (
                  <AppNavigator />
                ) : (
                  <OldVersionComponent />
                )}
              </React.Suspense>
              {validate.isBoolean(loginModal) && (
                <LoginScreenModal
                  logo={logo}
                  loginModal={loginModal}
                  mainBg={settings.main_bg}
                />
              )}
              {country && (
                <CountriesList country={country} countries={countries} />
              )}
              {validate.isBoolean(areaModal) && !validate.isEmpty(areas) && (
                <AreasList area={area} areas={areas} areaModal={areaModal} />
              )}
            </GlobalValuesContext.Provider>
          ) : (
            <SimpleSpinner />
          )}
        </Fragment>
      ) : (
        <LoadingOfflineView />
      )}
      {!validate.isEmpty(message) &&
        message.visible &&
        validate.isString(message.content) &&
        isConnected &&
        bootStrapped && <AlertMessage message={message} />}
      {bootStrapped && !validate.isEmpty(settings) && <ProductFilterModal />}
    </Fragment>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.IMMEDIATE,
})(App);
