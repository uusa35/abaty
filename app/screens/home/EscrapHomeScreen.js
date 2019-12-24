import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  AppState,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setDeepLinking,
  setPlayerId,
} from '../../redux/actions';
import {isIOS, width} from '../../constants';
import PropTypes from 'prop-types';
import OneSignal from 'react-native-onesignal';
import {
  ESCRAP_ONE_SIGNAL_APP_ID,
  ABATI,
  MALLR,
  HOMEKEY,
  ESCRAP,
} from './../../../app.json';
import {getPathForDeepLinking} from '../../helpers';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/MainSliderWidget';
import validate from 'validate.js';
import CompanyHorizontalWidget from '../../components/widgets/user/CompanyHorizontalWidget';
import I18n from '../../I18n';
import SimpleSpinner from '../../components/SimpleSpinner';
import {
  ClassifiedCategoryHorizontalRoundedWidget,
  ClassifiedListHorizontal,
  HomeKeySearchTab,
} from '../../components/LazyLoadingComponents/classifiedComponents';
import NavCategoryHorizontalRoundedWidget from '../../components/widgets/category/NavCategoryHorizontalRoundedWidget';
import NewClassifiedHomeBtn from '../../components/widgets/classified/NewClassifiedHomeBtn';
import ClassifiedSearchForm from '../../components/widgets/search/ClassifiedSearchForm';
import {map, flatten} from 'lodash';

const EscrapHomeScreen = ({
  homeCategories,
  categories,
  commercials,
  slides,
  show_commercials,
  colors,
  homeCompanies,
  dispatch,
  navigation,
  homeClassifieds,
  main_bg,
}) => {
  [refresh, setRefresh] = useState(false);
  [appState, setAppState] = useState(AppState.currentState);
  [device, setDevice] = useState('');
  [deviceId, setDeviceId] = useState('');
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [children, setChildren] = useState([]);

  useMemo(() => {
    const children = flatten(map(homeCategories, (c, i) => c.children));
    setChildren(children);
  }, [homeCategories]);
  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  useEffect(() => {
    AppState.addEventListener('change', handleAppStateChange);
    if (ESCRAP) {
      OneSignal.init(ESCRAP_ONE_SIGNAL_APP_ID);
      OneSignal.addEventListener('received', onReceived);
      OneSignal.addEventListener('opened', onOpened);
      OneSignal.addEventListener('ids', onIds);
    }
    //OneSignal.configure(); // this will fire even to fetch the player_id of the device;
    Linking.addEventListener('url', handleOpenURL);
    !isIOS
      ? BackHandler.addEventListener('hardwareBackPress', handleBackPress)
      : null;
  });

  const handleBackPress = useCallback(() => {
    return dispatch(goBackBtn(navigation.isFocused()));
    return true;
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

  const handleOpenURL = useCallback(event => {
    const {type, id} = getPathForDeepLinking(event.url);
    return dispatch(goDeepLinking({type, id}));
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
    const notification = getPathForDeepLinking(
      openResult.notification.payload.launchURL,
    );
    dispatch(setDeepLinking(notification));
    setTimeout(() => {
      dispatch(goDeepLinking());
    }, 2000);
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
        showsHorizontalScrollIndicator={false}
        endFillColor="white"
        showsVerticalScrollIndicator={false}
        style={{flex: 0.8}}>
        <React.Suspense fallback={<SimpleSpinner />}>
          {!validate.isEmpty(slides) ? (
            <MainSliderWidget slides={slides} />
          ) : null}
          <HomeKeySearchTab
            elements={categories}
            main_bg={main_bg}
            onlyTextForm={true}
          />
          {!validate.isEmpty(homeCategories) &&
          validate.isArray(homeCategories) ? (
            <NavCategoryHorizontalRoundedWidget
              elements={homeCategories}
              showName={true}
              showTitle={true}
              showLink={true}
              title={I18n.t('shops')}
            />
          ) : null}
          {!validate.isEmpty(homeCategories) &&
          validate.isArray(homeCategories) ? (
            <ClassifiedCategoryHorizontalRoundedWidget
              elements={children}
              showName={true}
              showLink={false}
              title={I18n.t('for_sale')}
            />
          ) : null}
          {!validate.isEmpty(homeClassifieds) &&
          validate.isArray(homeClassifieds) ? (
            <ClassifiedListHorizontal
              classifieds={homeClassifieds}
              showName={true}
              showSearch={false}
              showTitle={true}
              title={I18n.t('featured_classifieds')}
              searchElements={{on_home: true}}
            />
          ) : null}
          <CompanyHorizontalWidget
            elements={homeCompanies}
            showName={true}
            name={I18n.t('companies')}
            title={I18n.t('companies')}
            searchElements={{is_company: true}}
          />
          <NewClassifiedHomeBtn />
        </React.Suspense>
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

export default connect(mapStateToProps)(EscrapHomeScreen);

EscrapHomeScreen.propTypes = {
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

EscrapHomeScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor,
  },
});
