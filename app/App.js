import React, {useEffect} from 'react';
import {View} from 'react-native';
import codePush from 'react-native-code-push';
import {connect} from 'react-redux';
import {appBootstrap, resetStore} from './redux/actions';
import {AppNavigator} from './AppNavigator';
import LoadingView from './components/Loading/LoadingView';
import I18n from './I18n';
import validate from 'validate.js';
import AlertMessage from './components/AlertMessage';
import CountriesList from './components/Lists/CountriesList';
import {prefix} from './constants';
import LoadingOfflineView from './components/Loading/LoadingOfflineView';
import {DispatchContext} from './redux/DispatchContext';
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
  network,
  loginModal,
  main_bg,
  searchModal,
  lang,
  currency,
}) => {
  useEffect(() => {
    codePush.allowRestart();
    dispatch(appBootstrap());
    codePush.checkForUpdate().then(update => {
      if (!update) {
        // console.debug('The app is up to date!');
      } else {
        if (isLocal) {
          console.log('there is an update here');
        }
        // dispatch(resetStore());
      }
    });
    axiosInstance.defaults.headers['currency'] = currency;
    axiosInstance.defaults.headers.common['currency'] = currency;
    axiosInstance.defaults.headers['lang'] = lang;
    axiosInstance.defaults.headers.common['lang'] = lang;
    if (bootStrapped && !guest) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
  }, [lang, bootStrapped, token]);

  if (!bootStrapped || isLoading) {
    return (
      <LoadingView
        loadingText={I18n.t('loading')}
        isLoading={isLoading}
        logo={logo}
        color={colors ? colors.btn_bg_theme_color : 'black'}
        mainBg={main_bg}
      />
    );
  }
  if (isLoadingContent) {
    return (
      <LoadingContentView
        loadingText={I18n.t('loading')}
        isLoadingContent={isLoadingContent}
        logo={logo}
      />
    );
  }
  if (isLoadingProfile) {
    return (
      <LoadingProfileView
        loadingText={I18n.t('loading')}
        isLoadingContent={isLoadingProfile}
        logo={logo}
      />
    );
  }
  if (isLoadingBoxedList) {
    return (
      <LoadingBoxedListView
        loadingText={I18n.t('loading')}
        isLoadingContent={isLoadingBoxedList}
        logo={logo}
      />
    );
  }
  return (
    <DispatchContext.Provider value={{dispatch}}>
      {network.isConnected && bootStrapped ? (
        <View style={{flex: 1}}>
          {bootStrapped ? (
            <GlobalValuesContext.Provider
              value={{
                cartLength: cart.length,
                currency_symbol: country.currency.currency_symbol,
                exchange_rate: country.currency.exchange_rate,
                total,
                grossTotal,
                colors,
                country,
                token,
                logo,
                app_logo,
                guest,
                searchModal,
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
          ) : (
            <LoadingView
              loadingText={I18n.t('loading')}
              color={colors.btn_bg_theme_color}
              isLoading={isLoading}
              logo={logo}
              mainBg={main_bg}
            />
          )}
          {!validate.isEmpty(message) &&
          message.visible &&
          network.isConnected &&
          validate.isString(message.content) ? (
            <AlertMessage message={message} />
          ) : null}
        </View>
      ) : (
        <LoadingOfflineView mainBg={main_bg} />
      )}
    </DispatchContext.Provider>
  );
};

function mapStateToProps(state) {
  return {
    bootStrapped: state.bootStrapped,
    message: state.message,
    isLoading: state.isLoading,
    isLoadingContent: state.isLoadingContent,
    isLoadingProfile: state.isLoadingProfile,
    isLoadingBoxedList: state.isLoadingBoxedList,
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
    network: state.network,
    colors: state.settings.colors,
    logo: state.settings.logo,
    app_logo: state.settings.app_logo,
    main_bg: state.settings.main_bg,
    token: state.token,
    guest: state.guest,
    loginModal: state.loginModal,
    searchModal: state.searchModal,
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
};

export default connect(mapStateToProps)(codePush(App));
