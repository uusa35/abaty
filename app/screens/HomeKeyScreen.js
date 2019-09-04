import React, {Component} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  AppState,
  StyleSheet
} from 'react-native';
import {connect} from 'react-redux';
import {
  getClassifieds,
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setPlayerId
} from '../redux/actions';
import {isIOS, width} from '../constants';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import {ONE_SIGNAL_APP_ID, ABATI, MALLR, HOMEKEY} from './../../app.json';
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
import CategoryHorizontalRoundedWidget from '../components/widgets/category/CategoryHorizontalRoundedWidget';
import ClassifiedList from '../components/widgets/classified/ClassifiedList';
import ClassifiedListHorizontal from '../components/widgets/classified/ClassifiedListHorizontal';

class HomeKeyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refresh: false, appState: AppState.currentState};
  }

  shouldComponentUpdate(
    nextProps: Readonly<P>,
    nextState: Readonly<S>,
    nextContext: any
  ): boolean {
    return (
      nextProps.settings !== this.props.settings ||
      nextProps.products !== this.props.products ||
      nextProps.categories !== this.props.categories ||
      nextProps.designers !== this.props.designers ||
      nextProps.celebrities !== this.props.celebrities
    );
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
    const {logo} = this.props;
    console.log('the logo', logo);
    this.props.navigation.setParams({
      logo: !validate.isEmpty(logo) ? logo : null
    });
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
      categories,
      commercials,
      slides,
      splashes,
      brands,
      designers,
      celebrities,
      homeProducts,
      homeCollections,
      splash_on,
      show_commercials,
      colors,
      services,
      showIntroduction,
      classifieds,
      dispatch
    } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: colors.main_theme_bg_color}}>
        <ScrollView
          contentContainerStyle={{backgroundColor: 'transparent'}}
          contentInset={{bottom: 50}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() =>
                dispatch(getClassifieds({params: {on_home: true, page: 1}}))
              }
            />
          }
          showsHorizontalScrollIndicator={false}
          endFillColor="white"
          showsVerticalScrollIndicator={false}
          style={{flex: 0.8}}>
          {!validate.isEmpty(slides) ? (
            <MainSliderWidget slides={slides} />
          ) : null}
          {!validate.isEmpty(categories) &&
          validate.isArray(categories) &&
          HOMEKEY ? (
            <CategoryHorizontalRoundedWidget
              elements={categories}
              showName={true}
              title="categories"
              dispatch={dispatch}
            />
          ) : null}
          {!validate.isEmpty(classifieds) &&
          validate.isArray(classifieds) &&
          HOMEKEY ? (
            <ClassifiedListHorizontal
              classifieds={classifieds}
              showName={true}
              showSearch={false}
              showTitle={true}
              title="featured_classifieds"
              dispatch={dispatch}
              colors={colors}
              searchElements={{on_home: true}}
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
    categories: state.categories,
    brands: state.brands,
    designers: state.designers,
    celebrities: state.celebrities,
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
    classifieds: state.classifieds
  };
}

export default connect(mapStateToProps)(HomeKeyScreen);

HomeKeyScreen.propTypes = {
  categories: PropTypes.array,
  brands: PropTypes.array,
  designers: PropTypes.array,
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
