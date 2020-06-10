import React, {useCallback, useEffect, useState, Fragment} from 'react';
import {View, AppState, useColorScheme, StatusBar} from 'react-native';
import codePush from 'react-native-code-push';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  appBootstrap,
  refetchHomeElements,
  resetStore,
  setApplicationState,
  toggleBootstrapped,
  toggleIntroduction,
  toggleResetApp,
} from './redux/actions';
import {AppNavigator} from './AppNavigator';
import LoadingView from './components/Loading/LoadingView';
import I18n from './I18n';
import validate from 'validate.js';
import AlertMessage from './components/AlertMessage';
import CountriesList from './components/Lists/CountriesList';
// import LoadingOfflineView from './components/Loading/LoadingOfflineView';
import {GlobalValuesContext} from './redux/GlobalValuesContext';
import PropTypes from 'prop-types';
import {axiosInstance} from './redux/actions/api';
import LoginScreenModal from './screens/auth/LoginScreenModal';
import LoadingContentView from './components/Loading/LoadingContentView';
import LoadingProfileView from './components/Loading/LoadingProfileView';
import AreasList from './components/Lists/AreasList';
import LoadingBoxedListView from './components/Loading/LoadingBoxedListView';
import SimpleSpinner from './components/SimpleSpinner';
import {isLocal} from './env';
import ProductFilterModal from './screens/product/ProductFilterModal';
import ClassifiedFilterModal from './screens/search/ClassifiedFilterModal';

const App = () => {
  const colorScheme = useColorScheme();
  const {
    bootStrapped,
    message,
    countries,
    country,
    countryModal,
    area,
    areas,
    areaModal,
    logo,
    app_logo,
    cart,
    total,
    grossTotal,
    token,
    isConnected,
    loginModal,
    searchModal,
    lang,
    currency,
    resetApp,
    settings,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [appState, setAppState] = useState(AppState.currentState);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    dispatch(appBootstrap());
  }, [bootStrapped]);

  useEffect(() => {
    if (token.length > 5) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    axiosInstance.defaults.headers['currency'] = currency;
    axiosInstance.defaults.headers.common['currency'] = currency;
    axiosInstance.defaults.headers['country'] = country.name;
    axiosInstance.defaults.headers.common['country'] = country.name;
  }, [lang]);

  const handleAppStateChange = useCallback(
    (nextAppState) => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
      }
      setAppState(nextAppState);
    },
    [appState],
  );

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
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle={`${colorScheme}-content`} />
      {bootStrapped && (
        <GlobalValuesContext.Provider
          value={{
            cartLength: cart.length,
            countriesLength: countries.length,
            currency_symbol: country.currency.currency_symbol,
            exchange_rate: country.currency.exchange_rate,
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
            <AppNavigator />
          </React.Suspense>
          {validate.isBoolean(loginModal) ? (
            <LoginScreenModal
              logo={logo}
              loginModal={loginModal}
              mainBg={settings.main_bg}
            />
          ) : null}
          {validate.isBoolean(countryModal) && countryModal && country ? (
            <CountriesList
              country={country}
              countries={countries}
              countryModal={countryModal}
            />
          ) : null}
          {validate.isBoolean(areaModal) && !validate.isEmpty(areas) ? (
            <AreasList area={area} areas={areas} areaModal={areaModal} />
          ) : null}
        </GlobalValuesContext.Provider>
      )}
      {!validate.isEmpty(message) &&
      message.visible &&
      validate.isString(message.content) &&
      isConnected &&
      bootStrapped ? (
        <AlertMessage message={message} />
      ) : null}
      {bootStrapped ? (
        <Fragment>
          <ProductFilterModal />
          <ClassifiedFilterModal />
        </Fragment>
      ) : null}
    </Fragment>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
