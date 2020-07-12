import React, {useEffect, useState, Fragment} from 'react';
import {AppState, useColorScheme, StatusBar, SafeAreaView} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import codePush from 'react-native-code-push';
import {useDispatch, useSelector} from 'react-redux';
import {
  appBootstrap,
  checkConnection,
  refetchHomeElements,
  toggleBootstrapped,
} from './redux/actions';
import {AppNavigator} from './AppNavigator';
import validate from 'validate.js';
import AlertMessage from './components/AlertMessage';
import CountriesList from './components/Lists/CountriesList';
import {GlobalValuesContext} from './redux/GlobalValuesContext';
import {axiosInstance, checkConnectionStatus} from './redux/actions/api';
import LoginScreenModal from './screens/auth/LoginScreenModal';
import AreasList from './components/Lists/AreasList';
import SimpleSpinner from './components/SimpleSpinner';
import ProductFilterModal from './screens/product/ProductFilterModal';
import LoadingOfflineView from './components/Loading/LoadingOfflineView';
import {useNetInfo} from '@react-native-community/netinfo';

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

  // useEffect(() => {
  //   if (appState === 'background' && resetApp) {
  //   } else {
  //   }
  // }, [appState]);

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
      <StatusBar barStyle={`${colorScheme}-content`} />
      {isConnected ? (
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
            {bootStrapped && <AppNavigator />}
          </React.Suspense>
          {validate.isBoolean(loginModal) && (
            <LoginScreenModal
              logo={logo}
              loginModal={loginModal}
              mainBg={settings.main_bg}
            />
          )}
          {validate.isBoolean(countryModal) && countryModal && country && (
            <CountriesList
              country={country}
              countries={countries}
              countryModal={countryModal}
            />
          )}
          {validate.isBoolean(areaModal) && !validate.isEmpty(areas) && (
            <AreasList area={area} areas={areas} areaModal={areaModal} />
          )}
        </GlobalValuesContext.Provider>
      ) : (
        <LoadingOfflineView />
      )}
      {!validate.isEmpty(message) &&
        message.visible &&
        validate.isString(message.content) &&
        isConnected &&
        bootStrapped && <AlertMessage message={message} />}
      {bootStrapped && <ProductFilterModal />}
    </Fragment>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
