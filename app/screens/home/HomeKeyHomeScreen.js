import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  AppState,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {connect} from 'react-redux';
import {
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setPlayerId,
} from '../../redux/actions';
import {isIOS, width} from '../../constants';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import {Icon} from 'react-native-elements';
import {
  ONE_SIGNAL_APP_ID,
  ABATI,
  MALLR,
  HOMEKEY,
  ESCRAP,
} from './../../../app.json';
import {getPathForDeepLinking} from '../../helpers';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/MainSliderWidget';
import validate from 'validate.js';
import UserHorizontalWidget from '../../components/widgets/user/UserHorizontalWidget';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';
import ProductSearchForm from '../../components/widgets/search/ProductSearchForm';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import FastImage from 'react-native-fast-image';
import {has} from 'lodash';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import ServiceHorizontalWidget from '../../components/widgets/service/ServiceHorizontalWidget';
import CollectionHorizontalWidget from '../../components/widgets/collection/CollectionHorizontalWidget';
import ProductCategoryHorizontalWidget from '../../components/widgets/category/ProductCategoryHorizontalWidget';
import DesignerHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import CompanyHorizontalWidget from '../../components/widgets/user/CompanyHorizontalWidget';
import CelebrityHorizontalWidget from '../../components/widgets/user/CelebrityHorizontalWidget';
import ProductCategoryHorizontalBtnsWidget from '../../components/widgets/category/ProductCategoryHorizontalBtnsWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from '../../I18n';
import widgetStyles from '../../components/widgets/widgetStyles';
import SimpleSpinner from '../../components/SimpleSpinner';
import {
  ClassifiedCategoryHorizontalRoundedWidget,
  ClassifiedListHorizontal,
  HomeKeySearchTab,
} from '../../components/LazyLoadingComponents/classifiedComponents';
import NavCategoryHorizontalRoundedWidget from '../../components/widgets/category/NavCategoryHorizontalRoundedWidget';

const HomeKeyHomeScreen = ({
  homeCategories,
  categories,
  commercials,
  slides,
  show_commercials,
  colors,
  showIntroduction,
  homeCompanies,
  dispatch,
  navigation,
  homeClassifieds,
  main_bg,
  guest,
}) => {
  [refresh, setRefresh] = useState(false);
  [appState, setAppState] = useState(AppState.currentState);
  [device, setDevice] = useState('');
  [deviceId, setDeviceId] = useState('');
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    OneSignal.init(ONE_SIGNAL_APP_ID);
    // OneSignal.addEventListener('received', onReceived);
    // OneSignal.addEventListener('opened', onOpened);
    OneSignal.addEventListener('ids', onIds);
    OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    Linking.addEventListener('url', handleOpenURL);
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
      : null;
  });

  const handleAppStateChange = useCallback(
    nextAppState => {
      if (appState.match(/inactive|background/) && nextAppState === 'active') {
        __DEV__ ? console.log('HERE NOW') : null;
      }
      setAppState(nextAppState);
    },
    [appState],
  );

  const handleBackPress = useCallback(() => {
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
  });

  const handleOpenURL = useCallback(event => {
    const {type, id} = getPathForDeepLinking(event.url);
    return this.props.dispatch(goDeepLinking({type, id}));
  });

  const onReceived = useCallback(notification => {
    __DEV__ ? console.log('Notification received: ', notification) : null;
  });

  const onOpened = useCallback(openResult => {
    console.log('Notification Case');
    if (__DEV__) {
      console.log('the whole thing', openResult.notification.payload);
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult.notification.payload.launchURL);
    }
    const {path, params} = getPathForDeepLinking(
      openResult.notification.payload.additionalData.url,
    );
    dispatch(goDeepLinking(path, params));
  });

  const onIds = useCallback(
    device => {
      setDeviceId(device.userId);
      if (device.userId !== deviceId) {
        dispatch(setPlayerId(device.userId));
      }
    },
    [deviceId],
  );

  return (
    <View style={{margin: 0, padding: 0, flex: 1, height: '100%'}}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: colors.main_theme_bg_color,
        }}
        contentInset={{bottom: 50}}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }
        endFillColor="white"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 0.8}}>
        {!validate.isEmpty(slides) ? (
          <MainSliderWidget slides={slides} />
        ) : null}
        {!validate.isEmpty(categories) && validate.isArray(categories) ? (
          <HomeKeySearchTab elements={categories} main_bg={main_bg} />
        ) : null}
        {!validate.isEmpty(homeCategories) &&
        validate.isArray(homeCategories) ? (
          <ClassifiedCategoryHorizontalRoundedWidget
            elements={homeCategories}
            showName={true}
            title={I18n.t('categories')}
          />
        ) : null}
        {!validate.isEmpty(homeClassifieds) &&
        validate.isArray(homeClassifieds) ? (
          <ClassifiedListHorizontal
            classifieds={homeClassifieds}
            showName={true}
            showSearch={false}
            showTitle={true}
            title="featured_classifieds"
            searchElements={{on_home: true}}
          />
        ) : null}
        <CompanyHorizontalWidget
          elements={homeCompanies}
          showName={true}
          name={I18n.t('companies')}
          title="companies"
          searchElements={{is_company: true}}
        />
        <TouchableOpacity
          onPress={() =>
            !guest
              ? navigation.navigate('ChooseCategory')
              : navigation.navigate('Login')
          }
          style={[
            widgetStyles.newClassifiedBtnWrapper,
            {backgroundColor: colors.btn_bg_theme_color},
          ]}>
          <View style={[widgetStyles.newClassifiedWrapper]}>
            <Text
              style={[
                widgetStyles.newClassifiedTitle,
                {color: colors.btn_text_theme_color},
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
};

function mapStateToProps(state) {
  return {
    categories: state.categories,
    homeCategories: state.homeCategories,
    homeClassifieds: state.homeClassifieds,
    commercials: state.commercials,
    splashes: state.splashes,
    logo: state.settings.logo,
    main_bg: state.settings.main_bg,
    show_commercials: state.settings.show_commercials,
    colors: state.settings.colors,
    lang: state.lang,
    showIntroduction: state.showIntroduction,
    homeCompanies: state.homeCompanies,
    guest: state.guest,
  };
}

export default connect(mapStateToProps)(HomeKeyHomeScreen);

HomeKeyHomeScreen.propTypes = {
  categories: PropTypes.array,
  homeCategories: PropTypes.array,
  brands: PropTypes.array,
  homeDesigners: PropTypes.array,
  homeProducts: PropTypes.array,
  commercials: PropTypes.array,
  slides: PropTypes.array,
  splashes: PropTypes.array,
  show_commercials: PropTypes.bool,
  splash_on: PropTypes.bool,
};

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

HomeKeyHomeScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor,
  },
});
