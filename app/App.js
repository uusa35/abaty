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
import {
  colorsSelector,
  countrySelector,
  currencySelector,
  guestSelector,
  langSelector,
  logoSelector,
  tokenSelector
} from './redux/selectors/collection';
import {cartSelector, countriesSelector} from './redux/selectors/collections';
import LoadingContentView from './components/Loading/LoadingContentView';
import LoadingProfileView from './components/Loading/LoadingProfileView';

type Props = {};
class App extends Component<Props> {
  componentDidMount() {
    codePush.allowRestart();
    const {dispatch, bootStrapped, currency, lang, token} = this.props;
    codePush.checkForUpdate().then(update => {
      if (!update) {
      } else {
        console.log('An update is available! Should we download it?');
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
    if (!bootStrapped) {
      dispatch(appBootstrap());
    }
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
        {network.isConnected ? (
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
                {validate.isBoolean(countryModal) && countryModal ? (
                  <CountriesList
                    country={country}
                    countries={countries}
                    countryModal={countryModal}
                  />
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
  }
}

function mapStateToProps(state) {
  return {
    bootStrapped: state.bootStrapped,
    message: state.message,
    isLoading: state.isLoading,
    isLoadingContent: state.isLoadingContent,
    isLoadingProfile: state.isLoadingProfile,
    country: countrySelector(state),
    countries: countriesSelector(state),
    countryModal: state.countryModal,
    currency: currencySelector(state),
    lang: langSelector(state),
    cart: cartSelector(state),
    total: state.total,
    grossTotal: state.grossTotal,
    network: state.network,
    colors: colorsSelector(state),
    logo: logoSelector(state),
    main_bg: state.settings.main_bg,
    token: tokenSelector(state),
    guest: guestSelector(state),
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
