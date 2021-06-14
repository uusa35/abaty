import React, {useEffect, useState, Fragment} from 'react';
import {AppState} from 'react-native';
import codePush from 'react-native-code-push';
import {useDispatch, useSelector} from 'react-redux';
import {appBootstrap} from './../../redux/actions';
import validate from 'validate.js';
import AlertMessage from './../../components/AlertMessage';
import CountriesList from './../../components/Lists/CountriesList';
import {GlobalValuesContext} from './../../redux/GlobalValuesContext';
import {axiosInstance} from './../../redux/actions/api';
import LoginScreenModal from './../../screens/auth/LoginScreenModal';
import AreasList from './../../components/Lists/AreasList';
import SimpleSpinner from './../../components/SimpleSpinner';
import ProductFilterModal from './../../screens/product/ProductFilterModal';
import {useNetInfo} from '@react-native-community/netinfo';
import DeviceInfo from 'react-native-device-info';
import OldVersionComponent from './../../components/widgets/OldVersionComponenet';
import {minOldVersionApple, minOldVersionAndroid} from './../../../app.json';
import {isIOS} from './../../constants';
import LoadingView from '../Loading/LoadingView';
import SplashScreen from 'react-native-splash-screen';
import LoadingOfflineView from '../Loading/LoadingOfflineView';
import CurrenciesList from '../Lists/CurrenciesList';

const AppContainer = ({children}) => {
  const {
    bootStrapped,
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
  } = useSelector(state => state);
  const dispatch = useDispatch();
  const [appState, setAppState] = useState(AppState.currentState);
  const {isConnected} = useNetInfo();

  useEffect(() => {
    if (!validate.isEmpty(token) && token.length > 5) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    axiosInstance.defaults.headers['currency'] = currency.currency_symbol_en;
    axiosInstance.defaults.headers.common['currency'] =
      currency.currency_symbol_en;
    axiosInstance.defaults.headers['country'] = country.slug_en;
    axiosInstance.defaults.headers.common['country'] = country.slug_en;
  }, [token, lang, bootStrapped]);

  useEffect(() => {
    if (!validate.isEmpty(token) && token.length > 5) {
      axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
    }
    axiosInstance.defaults.headers['currency'] = currency.currency_symbol_en;
    axiosInstance.defaults.headers.common['currency'] =
      currency.currency_symbol_en;
    axiosInstance.defaults.headers['country'] = country.slug_en;
    axiosInstance.defaults.headers.common['country'] = country.slug_en;
  }, []);

  useEffect(() => {
    codePush.sync({installMode: codePush.InstallMode.IMMEDIATE});
    codePush.checkForUpdate().then(update => {
      if (!update) {
        // console.warn('====> The app is up to date!');
      } else {
        if (__DEV__) {
          // console.warn('===> there is an update here');
        }
      }
    });
    if (!bootStrapped) {
      dispatch(appBootstrap());
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 4000);
  }, []);

  useEffect(() => {
    if (isConnected) {
      dispatch(appBootstrap());
    }
  }, [isConnected]);

  return (
    <Fragment>
      {isConnected ? (
        <Fragment>
          {bootStrapped ? (
            <GlobalValuesContext.Provider
              value={{
                cartLength: cart.length,
                countriesLength: countries.length,
                currency_symbol: currency
                  ? currency.currency_symbol
                  : country.currency.currency_symbol,
                exchange_rate: currency
                  ? currency.exchange_rate
                  : country.currency.exchange_rate,
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
              <>
                {DeviceInfo.getVersion() >=
                (isIOS ? minOldVersionApple : minOldVersionAndroid) ? (
                  children
                ) : (
                  <OldVersionComponent />
                )}
              </>
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
              {currency && <CurrenciesList />}
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
    </Fragment>
  );
};

export default AppContainer;
