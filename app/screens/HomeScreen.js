import React, {Component} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  AppState,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import {connect} from 'react-redux';
import {
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setPlayerId
} from '../redux/actions';
import {isIOS, width} from '../constants';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import {
  ONE_SIGNAL_APP_ID,
  ABATI,
  MALLR,
  HOMEKEY,
  ESCRAP
} from './../../app.json';
import {getPathForDeepLinking} from '../helpers';
import FixedCommercialSliderWidget from '../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../components/widgets/MainSliderWidget';
import CategoryHorizontalWidget from '../components/widgets/category/CategoryHorizontalWidget';
import validate from 'validate.js';
import DesignerHorizontalWidget from '../components/widgets/user/DesignerHorizontalWidget';
import BrandHorizontalWidget from '../components/widgets/brand/BrandHorizontalWidget';
import SearchForm from '../components/SearchForm';
import ProductHorizontalWidget from '../components/widgets/product/ProductHorizontalWidget';
import FastImage from 'react-native-fast-image';
import {has} from 'lodash';
import IntroductionWidget from '../components/widgets/splash/IntroductionWidget';
import ServiceHorizontalWidget from '../components/widgets/service/ServiceHorizontalWidget';
import CollectionHorizontalWidget from '../components/widgets/collection/CollectionHorizontalWidget';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refresh: false, appState: AppState.currentState};
  }

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
    OneSignal.init(ONE_SIGNAL_APP_ID);
    // OneSignal.addEventListener('received', this.onReceived);
    // OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    Linking.addEventListener('url', this.handleOpenURL);

    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      : null;
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
    Linking.removeEventListener('url', this.handleOpenURL);
    OneSignal.removeEventListener('ids', this.onIds);
    // OneSignal.removeEventListener('received', this.onReceived);
    // OneSignal.removeEventListener('opened', this.onOpened);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      __DEV__ ? console.log('HERE NOW') : null;
    }
    this.setState({appState: nextAppState});
  };

  handleBackPress = () => {
    const {navigation, dispatch} = this.props;
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
  };

  handleOpenURL = event => {
    const {type, id} = getPathForDeepLinking(event.url);
    return this.props.dispatch(goDeepLinking({type, id}));
  };

  onReceived = notification => {
    __DEV__ ? console.log('Notification received: ', notification) : null;
  };

  onOpened = openResult => {
    // console.log('Notification Case');
    // if (__DEV__) {
    // console.log('the whole thing', openResult.notification.payload);
    // console.log('Message: ', openResult.notification.payload.body);
    // console.log('Data: ', openResult.notification.payload.additionalData);
    // console.log('isActive: ', openResult.notification.isAppInFocus);
    // console.log('openResult: ', openResult.notification.payload.launchURL);
    // }
    const {path, params} = getPathForDeepLinking(
      openResult.notification.payload.additionalData.url
    );
    this.props.dispatch(goDeepLinking(path, params));
  };

  onIds = device => {
    const {isConnected} = this.props.network;
    return isConnected ? this.props.dispatch(setPlayerId(device.userId)) : null;
  };

  _refetchElements = () => {
    this.props.dispatch(refetchHomeElements());
    this.setState({refresh: false});
  };

  render() {
    const {
      homeCategories,
      commercials,
      slides,
      splashes,
      brands,
      homeDesigners,
      homeCelebrities,
      homeProducts,
      homeCollections,
      splash_on,
      show_commercials,
      colors,
      services,
      showIntroduction,
      homeCompanies,
      dispatch,
      navigation
    } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: colors.main_theme_bg_color}}>
        {!validate.isEmpty(splashes) && splash_on && __DEV__ ? (
          <IntroductionWidget
            elements={splashes}
            showIntroduction={showIntroduction}
            dispatch={dispatch}
          />
        ) : null}
        <ScrollView
          contentContainerStyle={{backgroundColor: 'transparent'}}
          contentInset={{bottom: 50}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this._refetchElements()}
            />
          }
          showsHorizontalScrollIndicator={false}
          endFillColor="white"
          showsVerticalScrollIndicator={false}
          style={{flex: 0.8}}>
          {!validate.isEmpty(slides) ? (
            <MainSliderWidget slides={slides} />
          ) : null}
          {!validate.isEmpty(homeDesigners) &&
          validate.isArray(homeDesigners) &&
          (ABATI || MALLR) ? (
            <DesignerHorizontalWidget
              elements={homeDesigners}
              showName={true}
              name="designers"
              title="designers"
              searchElements={{is_designer: true}}
              dispatch={dispatch}
              colors={colors}
            />
          ) : null}
          {MALLR ? (
            <DesignerHorizontalWidget
              elements={homeCompanies}
              showName={true}
              name="companies"
              title="companies"
              searchElements={{is_company: true}}
              dispatch={dispatch}
              colors={colors}
            />
          ) : null}
          {!validate.isEmpty(homeCategories) &&
          validate.isArray(homeCategories) &&
          (ABATI || MALLR) ? (
            <CategoryHorizontalWidget
              elements={homeCategories}
              showName={true}
              title="categories"
              dispatch={dispatch}
              colors={colors}
              navigation={navigation}
              type="products"
            />
          ) : null}
          {!validate.isEmpty(homeCelebrities) &&
          validate.isArray(homeCelebrities) &&
          ABATI ? (
            <DesignerHorizontalWidget
              elements={homeCelebrities}
              showName={true}
              name="celebrities"
              title="celebrities"
              searchElements={{is_celebrity: true}}
              colors={colors}
              dispatch={dispatch}
            />
          ) : null}
          {!validate.isEmpty(homeProducts) && (ABATI || MALLR) ? (
            <ProductHorizontalWidget
              elements={homeProducts}
              showName={true}
              title="featured_products"
              dispatch={dispatch}
              colors={colors}
            />
          ) : null}
          {!validate.isEmpty(brands) &&
          validate.isArray(brands) &&
          (ABATI || MALLR) ? (
            <BrandHorizontalWidget
              elements={brands}
              showName={false}
              title="brands"
            />
          ) : null}
          {!validate.isEmpty(services) && ABATI ? (
            <ServiceHorizontalWidget
              elements={services}
              showName={true}
              title="our_services"
              dispatch={dispatch}
              colors={colors}
            />
          ) : null}
          {!validate.isEmpty(homeCollections) && MALLR ? (
            <CollectionHorizontalWidget
              colors={colors}
              elements={homeCollections}
              showName={true}
              title="our_collections"
              dispatch={dispatch}
            />
          ) : null}
        </ScrollView>
        {show_commercials ? (
          <View style={{flex: 0.2}}>
            {!validate.isEmpty(commercials) ? (
              <FixedCommercialSliderWidget sliders={commercials} />
            ) : null}
          </View>
        ) : null}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    homeCategories: state.homeCategories,
    brands: state.brands,
    homeDesigners: state.homeDesigners,
    homeCelebrities: state.homeCelebrities,
    homeProducts: state.homeProducts,
    commercials: state.commercials,
    slides: state.slides,
    splashes: state.splashes,
    logo: state.settings.logo,
    splash_on: state.settings.splash_on,
    show_commercials: state.settings.show_commercials,
    network: state.network,
    colors: state.settings.colors,
    lang: state.lang,
    services: state.services,
    homeCollections: state.homeCollections,
    showIntroduction: state.showIntroduction,
    homeCompanies: state.homeCompanies
  };
}

export default connect(mapStateToProps)(HomeScreen);

HomeScreen.propTypes = {
  homeCategories: PropTypes.array,
  brands: PropTypes.array,
  homeDesigners: PropTypes.array,
  homeProducts: PropTypes.array,
  homeCollections: PropTypes.array,
  commercials: PropTypes.array,
  slides: PropTypes.array,
  splashes: PropTypes.array,
  show_commercials: PropTypes.bool,
  splash_on: PropTypes.bool
};

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
