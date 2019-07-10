import React, {Component} from 'react';
import {View, Text} from 'react-native';
import codePush from 'react-native-code-push';
import {connect} from 'react-redux';
import {appBootstrap} from './redux/actions';
import {AppNavigator} from './AppNavigator';
import LoadingView from './components/LoadingView';
import {CountriesContext} from './redux/CountriesContext';
import I18n from './I18n';
import validate from 'validate.js';
import AlertMessage from './components/AlertMessage';
import CountriesList from './components/Lists/CountriesList';
import {prefix} from './constants';
import LoadingOfflineView from './components/LoadingOfflineView';
import {NetworkConsumer} from 'react-native-offline';
import axios from 'axios';
import {DispatchContext} from './redux/DispatchContext';
import {GlobalValuesContext} from './redux/GlobalValuesContext';
import PropTypes from 'prop-types';

type Props = {};
class App extends Component<Props> {
  componentDidMount() {
    codePush.allowRestart();
    const {dispatch, network} = this.props;
    if (network.isConnected) {
      return dispatch(appBootstrap());
    }
  }

  render() {
    const {
      isLoading,
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
      token,
      guest,
      currency_symbol,
      exchange_rate,
      network
    } = this.props;
    const cartLength = cart.length;
    if (!bootStrapped) {
      return (
        <LoadingView
          loadingText={I18n.t('loading')}
          isLoading={isLoading}
          logo={logo}
        />
      );
    }
    if (isLoading) {
      return (
        <LoadingView
          loadingText={I18n.t('loading')}
          isLoading={isLoading}
          logo={logo}
        />
      );
    }
    console.log('NETWORK', network);
    return (
      <DispatchContext.Provider value={{dispatch}}>
        {network.isConnected ? (
          <View style={{flex: 1}}>
            {bootStrapped ? (
              <GlobalValuesContext.Provider
                value={{
                  cartLength,
                  currency_symbol,
                  exchange_rate,
                  total,
                  colors,
                  country,
                  token,
                  guest
                }}>
                <AppNavigator uriPrefix={prefix} />
              </GlobalValuesContext.Provider>
            ) : (
              <LoadingView
                loadingText={I18n.t('loading')}
                isLoading={isLoading}
                logo={logo}
              />
            )}
            {!validate.isEmpty(message) &&
            message.visible &&
            network.isConnected &&
            validate.isString(message.content) ? (
              <AlertMessage message={message} />
            ) : null}
            {validate.isBoolean(countryModal) && countryModal ? (
              <CountriesContext.Provider
                value={{country, countries, countryModal}}>
                <CountriesList />
              </CountriesContext.Provider>
            ) : null}
          </View>
        ) : (
          <LoadingOfflineView />
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
    country: state.country,
    countries: state.countries,
    countryModal: state.countryModal,
    symbol: state.currency.symbol,
    currency_symbol: state.currency.currency_symbol,
    exchange_rate: state.currency.exchange_rate,
    lang: state.lang,
    cart: state.cart,
    total: state.total,
    network: state.network,
    colors: state.settings.colors,
    logo: state.settings.logo,
    token: state.token,
    guest: state.guest
  };
}

App.propTypes = {
  bootStrapped: PropTypes.bool.isRequired,
  logo: PropTypes.string,
  colors: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.object,
  country: PropTypes.object.isRequired,
  symbol: PropTypes.string,
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
