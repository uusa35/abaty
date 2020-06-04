import React, {useCallback, useEffect, useState, Fragment} from 'react';
import {View, AppState, useColorScheme, StatusBar} from 'react-native';
import codePush from 'react-native-code-push';
import {connect} from 'react-redux';
import {
  appBootstrap,
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

const App = ({
  isLoading,
  isLoadingContent,
  isLoadingProfile,
  isLoadingBoxedList,
  dispatch,
  bootStrapped,
  message,
  countries,
  country,
  countryModal,
  area,
  areas,
  areaModal,
  colors,
  logo,
  app_logo,
  cart,
  total,
  grossTotal,
  token,
  guest,
  isConnected,
  loginModal,
  main_bg,
  searchModal,
  lang,
  currency,
  resetApp,
  settings,
}) => {
  const colorScheme = useColorScheme();
  const [appState, setAppState] = useState(AppState.currentState);
  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    dispatch(appBootstrap());
    // codePush.allowRestart();
    codePush.checkForUpdate().then((update) => {
      if (!update) {
        // console.debug('The app is up to date!');
      } else {
        if (isLocal) {
          console.log('there is an update here');
        }
      }
    });
    axiosInstance.defaults.headers['currency'] = currency;
    axiosInstance.defaults.headers.common['currency'] = currency;
    axiosInstance.defaults.headers['country'] = country.name;
    axiosInstance.defaults.headers.common['country'] = country.name;
    axiosInstance.defaults.headers['lang'] = lang;
    axiosInstance.defaults.headers.common['lang'] = lang;
    bootStrapped && !guest
      ? (axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`)
      : null;
  }, [bootStrapped, token]);

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
            colors,
            logo,
            app_logo,
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
              mainBg={main_bg}
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

function mapStateToProps(state) {
  return {
    bootStrapped: state.bootStrapped,
    message: state.message,
    country: state.country,
    countries: state.countries,
    countryModal: state.countryModal,
    area: state.area,
    areas: state.areas,
    areaModal: state.areaModal,
    currency: state.currency,
    lang: state.lang,
    cart: state.cart,
    total: state.total,
    grossTotal: state.grossTotal,
    isConnected: state.isConnected,
    colors: state.settings.colors,
    settings: state.settings,
    logo: state.settings.logo,
    app_logo: state.settings.app_logo,
    main_bg: state.settings.main_bg,
    token: state.token,
    guest: state.guest,
    loginModal: state.loginModal,
    searchModal: state.searchModal,
    resetApp: state.resetApp,
  };
}

App.propTypes = {
  bootStrapped: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  app_logo: PropTypes.string,
  colors: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  isLoadingContent: PropTypes.bool.isRequired,
  isLoadingProfile: PropTypes.bool.isRequired,
  searchModal: PropTypes.bool,
  message: PropTypes.object,
  country: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired,
  currency_symbol: PropTypes.string,
  exchange_rate: PropTypes.number,
  countries: PropTypes.array.isRequired,
  cart: PropTypes.array,
  total: PropTypes.number.isRequired,
  lang: PropTypes.string.isRequired,
  token: PropTypes.string,
  guest: PropTypes.bool,
  resetApp: PropTypes.bool,
};

export default connect(mapStateToProps)(
  codePush({updateDialog: false, installMode: codePush.InstallMode.IMMEDIATE})(
    App,
  ),
);
