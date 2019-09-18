import React, {Component} from 'react';
import {View} from 'react-native';
import codePush from 'react-native-code-push';
import {connect} from 'react-redux';
import {appBootstrap, resetStore} from './redux/actions';
import {AppNavigator} from './AppNavigator';
import LoadingView from './components/Loading/LoadingView';
import I18n, {isRTL} from './I18n';
import validate from 'validate.js';
import AlertMessage from './components/AlertMessage';
import CountriesList from './components/Lists/CountriesList';
import {prefix} from './constants';
import LoadingOfflineView from './components/Loading/LoadingOfflineView';
import {DispatchContext} from './redux/DispatchContext';
import {GlobalValuesContext} from './redux/GlobalValuesContext';
import PropTypes from 'prop-types';
import {axiosInstance} from './redux/actions/api';
import LoginScreenModal from './screens/LoginScreenModal';
import LoadingContentView from './components/Loading/LoadingContentView';
import LoadingProfileView from './components/Loading/LoadingProfileView';
import AreasList from './components/Lists/AreasList';

type Props = {};
class App extends Component<Props> {
  componentDidMount() {
    codePush.allowRestart();
    const {dispatch, currency, lang, token} = this.props;
    dispatch(appBootstrap());
    codePush.checkForUpdate().then(update => {
      if (!update) {
      } else {
        __DEV__
          ? console.log('An update is available! Should we download it?')
          : null;
        dispatch(resetStore());
      }
    });
    axiosInstance.defaults.headers['currency'] = !validate.isEmpty(currency)
      ? currency
      : 'KWD';
    axiosInstance.defaults.headers.common['currency'] = !validate.isEmpty(
      currency
    )
      ? currency
      : 'KWD';
    axiosInstance.defaults.headers['lang'] = !validate.isEmpty(lang)
      ? lang
      : isRTL
      ? 'ar'
      : 'en';
    axiosInstance.defaults.headers.common['lang'] = !validate.isEmpty(lang)
      ? lang
      : isRTL
      ? 'ar'
      : 'en';
    axiosInstance.defaults.headers['Authorization'] = !validate.isEmpty(token)
      ? `Bearer ${token}`
      : null;
    //__DEV__ ? console.log(axiosInstance.defaults.headers) : null;
  }

  render() {
    const {
      isLoading,
      isLoadingContent,
      isLoadingProfile,
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
      cart,
      total,
      grossTotal,
      token,
      guest,
      network,
      loginModal,
      main_bg
    } = this.props;
    const cartLength = cart.length;
    if (!bootStrapped || isLoading) {
      return (
        <LoadingView
          loadingText={I18n.t('loading')}
          isLoading={isLoading}
          logo={logo}
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
    return (
      <DispatchContext.Provider value={{dispatch}}>
        {network.isConnected && bootStrapped ? (
          <View style={{flex: 1}}>
            {bootStrapped ? (
              <GlobalValuesContext.Provider
                value={{
                  cartLength,
                  currency_symbol: country.currency.currency_symbol,
                  exchange_rate: country.currency.exchange_rate,
                  total,
                  grossTotal,
                  colors,
                  country,
                  token,
                  logo,
                  guest
                }}>
                <AppNavigator uriPrefix={prefix} />
                {validate.isBoolean(loginModal) ? (
                  <LoginScreenModal
                    colors={colors}
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
              <AlertMessage message={message} dispatch={dispatch} />
            ) : null}
          </View>
        ) : (
          <LoadingOfflineView mainBg={main_bg} />
        )}
      </DispatchContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    bootStrapped: state.bootStrapped,
    message: state.message,
    isLoading: state.isLoading,
    isLoadingContent: state.isLoadingContent,
    isLoadingProfile: state.isLoadingProfile,
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
    main_bg: state.settings.main_bg,
    token: state.token,
    guest: state.guest,
    loginModal: state.loginModal
  };
}

App.propTypes = {
  bootStrapped: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  colors: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  isLoadingContent: PropTypes.bool.isRequired,
  isLoadingProfile: PropTypes.bool.isRequired,
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
  guest: PropTypes.bool
};

export default connect(mapStateToProps)(codePush(App));
