import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {
  BackHandler,
  Linking,
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';
import {connect} from 'react-redux';
import {
  goBackBtn,
  goDeepLinking,
  refetchHomeElements,
  setDeepLinking,
  setPlayerId,
  toggleResetApp,
} from '../../redux/actions';
import {isIOS} from '../../constants';
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
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
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
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import AndroidBackHandlerComponent from '../../components/AndroidBackHandlerComponent';
import AppHomeConfigComponent from '../../AppHomeConfigComponent';

const EscrapHomeScreen = ({
  homeCategories,
  categories,
  commercials,
  slides,
  show_commercials,
  colors,
  homeCompanies,
  homeClassifieds,
  homeUserCategories,
  homeClassifiedCategories,
  main_bg,
  splashes,
  splash_on,
  showIntroduction,
}) => {
  const [refresh, setRefresh] = useState(false);

  return (
    <View
      style={{
        margin: 0,
        padding: 0,
        flex: 1,
        height: '100%',
        backgroundColor: colors.main_theme_bg_color,
      }}>
      <AndroidBackHandlerComponent />
      <AppHomeConfigComponent />
      {!validate.isEmpty(splashes) && splash_on ? (
        <IntroductionWidget
          elements={splashes}
          showIntroduction={showIntroduction}
        />
      ) : null}
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
          {!validate.isEmpty(homeUserCategories) &&
          validate.isArray(homeUserCategories) ? (
            <NavCategoryHorizontalRoundedWidget
              elements={homeUserCategories}
              showName={true}
              showTitle={true}
              showLink={true}
              title={I18n.t('shops')}
            />
          ) : null}
          {!validate.isEmpty(homeClassifiedCategories) &&
          validate.isArray(homeClassifiedCategories) ? (
            <ClassifiedCategoryHorizontalRoundedWidget
              elements={homeClassifiedCategories}
              showName={true}
              showLink={true}
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
          {!validate.isEmpty(homeCompanies) &&
          validate.isArray(homeCompanies) ? (
            <CompanyHorizontalWidget
              elements={homeCompanies}
              showName={true}
              name={I18n.t('companies')}
              title={I18n.t('companies')}
              searchElements={{is_company: true}}
            />
          ) : null}
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
    homeUserCategories: state.homeUserCategories,
    homeClassifiedCategories: state.homeClassifiedCategories,
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
    linking: state.linking,
    bootStrapped: state.bootStrapped,
  };
}

export default connect(mapStateToProps)(EscrapHomeScreen);

EscrapHomeScreen.propTypes = {
  categories: PropTypes.array,
  homeCategories: PropTypes.array,
  homeUserCategories: PropTypes.array,
  homeClassifiedCategories: PropTypes.array,
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
