import React, {useEffect, useState, Fragment} from 'react';
import {AppState, useColorScheme, StatusBar, SafeAreaView} from 'react-native';
import codePush from 'react-native-code-push';
import {useDispatch, useSelector} from 'react-redux';
import {
  appBootstrap,
  refetchHomeElements,
  toggleBootstrapped,
} from './redux/actions';
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
    dispatch(appBootstrap());
    // dispatch(refetchHomeElements());
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState.match(/inactive|background/) && nextAppState === 'active') {
    }
    setAppState(nextAppState);
  };
  {
    /*<SafeAreaView style={{ backgroundColor : 'blue', height : 10, borderWidth : 10}}/>*/
  }
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
      )}
      {!validate.isEmpty(message) &&
        message.visible &&
        validate.isString(message.content) &&
        isConnected &&
        bootStrapped && <AlertMessage message={message} />}
      {bootStrapped && (
        <Fragment>
          <ProductFilterModal />
          {/*<ClassifiedFilterModal />*/}
        </Fragment>
      )}
    </Fragment>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_RESUME,
})(App);
