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
  gethomeClassifieds,
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setPlayerId
} from '../redux/actions';
import {Icon} from 'react-native-elements';
import I18n from './../I18n';
import {isIOS, width, text} from '../constants';
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
import CategoryHorizontalRoundedWidget from '../components/widgets/category/CategoryHorizontalRoundedWidget';
import ClassifiedList from '../components/widgets/classified/ClassifiedList';
import ClassifiedListHorizontal from '../components/widgets/classified/ClassifiedListHorizontal';
import widgetStyles from '../components/widgets/widgetStyles';

class HomeKeyScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {refresh: false, appState: AppState.currentState};
  }

  static navigationOptions = ({navigation, navigationOptions}) => {
    if (
      has(navigation.state, 'params') &&
      has(navigation.state.params, 'logo')
    ) {
      return {
        headerTitle: (
          <View style={styles.safeContainer}>
            <FastImage
              resizeMode="contain"
              source={{
                uri: navigation.state.params.logo
                  ? navigation.state.params.logo
                  : null
              }}
              style={{
                width: '100%',
                height: 35,
                maxWidth: 80
              }}
            />
          </View>
        )
      };
    }
  };

  // shouldComponentUpdate(
  //   nextProps: Readonly<P>,
  //   nextState: Readonly<S>,
  //   nextContext: any
  // ): boolean {
  //   return (
  //     nextProps.settings !== this.props.settings ||
  //     nextProps.products !== this.props.products ||
  //     nextProps.categories !== this.props.categories ||
  //     nextProps.designers !== this.props.designers ||
  //     nextProps.celebrities !== this.props.celebrities
  //   );
  // }

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
      homeClassifieds,
      dispatch,
      navigation,
      guest
    } = this.props;
    return (
      <View style={{flex: 1, backgroundColor: colors.main_theme_bg_color}}>
        <ScrollView
          contentContainerStyle={{backgroundColor: 'transparent'}}
          contentInset={{bottom: 50}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => dispatch(refetchHomeElements())}
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
              colors={colors}
              showName={true}
              title="categories"
              dispatch={dispatch}
              navigation={navigation}
            />
          ) : null}
          {(!validate.isEmpty(homeClassifieds) &&
            validate.isArray(homeClassifieds) &&
            HOMEKEY) ||
          ESCRAP ? (
            <ClassifiedListHorizontal
              classifieds={homeClassifieds}
              showName={true}
              showSearch={false}
              showTitle={true}
              title="featured_classifieds"
              dispatch={dispatch}
              colors={colors}
              searchElements={{on_home: true}}
            />
          ) : null}
          <TouchableOpacity
            onPress={() =>
              !guest
                ? navigation.navigate('ChooseCategory')
                : navigation.navigate('Login')
            }
            style={[
              widgetStyles.newClassifiedBtnWrapper,
              {backgroundColor: colors.btn_bg_theme_color}
            ]}>
            <View style={[widgetStyles.newClassifiedWrapper]}>
              <Text
                style={[
                  widgetStyles.newClassifiedTitle,
                  {color: colors.btn_text_theme_color}
                ]}>
                {I18n.t('new_classified')}
              </Text>
              <Icon
                name="home"
                type="material-icon"
                size={120}
                color={colors.btn_text_theme_color}
                containerStyle={{opacity: 0.8}}
              />
            </View>
          </TouchableOpacity>
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
    homeClassifieds: state.homeClassifieds,
    guest: state.guest
  };
}

export default connect(mapStateToProps)(HomeKeyScreen);

HomeKeyScreen.propTypes = {
  categories: PropTypes.array,
  homeClassifieds: PropTypes.array,
  brands: PropTypes.array,
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
