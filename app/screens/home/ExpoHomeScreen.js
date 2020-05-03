import React, {useState, useCallback, useMemo} from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import PropTypes from 'prop-types';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import ServiceHorizontalWidget from '../../components/widgets/service/ServiceHorizontalWidget';
import CelebrityHorizontalWidget from '../../components/widgets/user/CelebrityHorizontalWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from '../../I18n';
import ProductSearchForm from '../../components/widgets/search/ProductSearchForm';
import AndroidBackHandlerComponent from '../../components/AndroidBackHandlerComponent';
import AppHomeConfigComponent from '../../AppHomeConfigComponent';
import {height, width} from './../../constants/sizes';
import ExpoMainSliderWidget from '../../components/widgets/slider/ExpoMainSliderWidget';
import ExpoDesignerHorizontalWidget from '../../components/widgets/user/ExpoDesignerHorizontalWidget';

const ExpoHomeScreen = ({
  homeCategories,
  commercials,
  slides,
  brands,
  homeDesigners,
  homeCelebrities,
  homeProducts,
  splashes,
  splash_on,
  show_commercials,
  colors,
  services,
  showIntroduction,
  dispatch,
  mainBg,
}) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  return (
    <ImageBackground
      style={{height, width, paddingTop: '25%'}}
      source={{uri: mainBg}}>
      <AndroidBackHandlerComponent />
      <AppHomeConfigComponent />
      {!validate.isEmpty(splashes) && splash_on ? (
        <IntroductionWidget
          elements={splashes}
          showIntroduction={showIntroduction}
        />
      ) : null}
      <ScrollView
        contentContainerStyle={{backgroundColor: 'transparent'}}
        // contentInset={{bottom: 50}}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }
        showsHorizontalScrollIndicator={false}
        endFillColor="white"
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}>
        {/*<ProductSearchForm />*/}
        {!validate.isEmpty(slides) ? (
          <ExpoMainSliderWidget slides={slides} />
        ) : null}
        {!validate.isEmpty(homeDesigners) && validate.isArray(homeDesigners) ? (
          <ExpoDesignerHorizontalWidget
            elements={homeDesigners}
            showName={true}
            name={I18n.t('expos')}
            title={I18n.t('expos')}
            searchElements={{is_designer: true}}
          />
        ) : null}
        {!validate.isEmpty(homeCelebrities) &&
        validate.isArray(homeCelebrities) ? (
          <ExpoDesignerHorizontalWidget
            elements={homeCelebrities}
            showName={true}
            name="small_business"
            title={I18n.t('small_business')}
            searchElements={{is_celebrity: true}}
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
    </ImageBackground>
  );
};

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
    mainBg: state.settings.main_bg,
    splash_on: state.settings.splash_on,
    show_commercials: state.settings.show_commercials,
    colors: state.settings.colors,
    lang: state.lang,
    services: state.homeServices,
    showIntroduction: state.showIntroduction,
    homeCompanies: state.homeCompanies,
    bootStrapped: state.bootStrapped,
    linking: state.linking,
  };
}

export default connect(mapStateToProps)(ExpoHomeScreen);

ExpoHomeScreen.propTypes = {
  homeCategories: PropTypes.array,
  brands: PropTypes.array,
  homeDesigners: PropTypes.array,
  homeProducts: PropTypes.array,
  commercials: PropTypes.array,
  slides: PropTypes.array,
  splashes: PropTypes.array,
  show_commercials: PropTypes.bool,
  splash_on: PropTypes.bool,
  bootStrapped: PropTypes.bool,
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
