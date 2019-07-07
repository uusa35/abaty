import React, {Component} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View
} from 'react-native';
import {NavContext} from '../redux/NavContext';
import {connect} from 'react-redux';
import {
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setPlayerId
} from '../redux/actions';
import {images, isIOS, text, width} from '../constants';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import {ONE_SIGNAL_APP_ID} from './../../app.json';
import {getPathForDeepLinking} from '../helpers';
import FixedCommercialSliderWidget from '../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../components/widgets/MainSliderWidget';
import CategoryHorizontalWidget from '../components/widgets/CategoryHorizontalWidget';
import validate from 'validate.js';
import DesignerHorizontalWidget from '../components/widgets/user/DesignerHorizontalWidget';
import BrandHorizontalWidget from '../components/widgets/brand/BrandHorizontalWidget';
import SearchForm from '../components/SearchForm';
import ProductHorizontalWidget from '../components/widgets/product/ProductHorizontalWidget';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-navigation';
import celebrities from '../redux/reducers/celebrities';
import {has} from 'lodash';
import IntroductionWidget from '../components/widgets/splash/IntroductionWidget';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refresh: false};
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    if (has(navigation.state, 'params')) {
      return {
        headerTitle: (
          <SafeAreaView>
            <FastImage
              resizeMode="stretch"
              source={{
                uri: navigation.state.params.logo
                  ? navigation.state.params.logo
                  : null
              }}
              style={{width: 70, height: 40}}
            />
          </SafeAreaView>
        )
      };
    }
  };

  componentDidMount() {
    console.log('did mount');
    OneSignal.init(ONE_SIGNAL_APP_ID);
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    Linking.addEventListener('url', this.handleOpenURL);
    OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      : null;
    const {logo} = this.props;
    this.props.navigation.setParams({
      logo: !validate.isEmpty(logo) ? logo : null
    });
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleOpenURL);
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  handleBackPress = () => {
    const {navigation, dispatch} = this.props;
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
  };

  handleOpenURL = event => {
    console.log('Initial Url Case');
    const {path, params} = getPathForDeepLinking(event.url);
    return this.props.dispatch(goDeepLinking(path, params));
  };

  onReceived = notification => {
    console.log('Notification received: ', notification);
  };

  onOpened = openResult => {
    console.log('Notification Case');
    if (__DEV__) {
      console.log('the whole thing', openResult.notification.payload);
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult.notification.payload.launchURL);
    }
    const {path, params} = getPathForDeepLinking(
      openResult.notification.payload.additionalData.url
    );
    const {isConnected} = this.props.network;
    return isConnected
      ? this.props.dispatch(goDeepLinking(path, params))
      : null;
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
      navigation,
      commercials,
      slides,
      splashes,
      brands,
      designers,
      celebrities,
      homeProducts,
      splash_on,
      show_commercials
    } = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <View style={{flex: 1}}>
          {!validate.isEmpty(splashes) && splash_on && !__DEV__ ? (
            <IntroductionWidget elements={splashes} visible={splash_on} />
          ) : null}
          <ScrollView
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
            <SearchForm />
            {!validate.isEmpty(slides) ? (
              <MainSliderWidget slides={slides} />
            ) : null}
            {!validate.isEmpty(designers) ? (
              <DesignerHorizontalWidget
                elements={designers}
                showName={false}
                title="designers"
              />
            ) : null}
            {!validate.isEmpty(categories) && validate.isArray(categories) ? (
              <CategoryHorizontalWidget
                elements={categories}
                showName={true}
                title="categories"
              />
            ) : null}
            {!validate.isEmpty(celebrities) && validate.isArray(celebrities) ? (
              <DesignerHorizontalWidget
                elements={celebrities}
                showName={false}
                title="celebrities"
              />
            ) : null}
            {!validate.isEmpty(brands) && validate.isArray(brands) ? (
              <BrandHorizontalWidget
                elements={brands}
                showName={false}
                title="brands"
              />
            ) : null}
            {!validate.isEmpty(homeProducts) ? (
              <ProductHorizontalWidget
                elements={homeProducts}
                showName={true}
                title="featured_products"
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
      </NavContext.Provider>
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
    network: state.network
  };
}

export default connect(mapStateToProps)(HomeScreen);

HomeScreen.propTypes = {
  categories: PropTypes.array,
  brands: PropTypes.array,
  designers: PropTypes.array,
  products: PropTypes.array,
  commercials: PropTypes.array,
  slides: PropTypes.array,
  splashes: PropTypes.array,
  show_commercials: PropTypes.bool,
  splash_on: PropTypes.bool
};
