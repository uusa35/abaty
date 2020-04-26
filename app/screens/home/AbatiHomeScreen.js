import React, {useState, useCallback} from 'react';
import {RefreshControl, ScrollView, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import PropTypes from 'prop-types';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/MainSliderWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import ServiceHorizontalWidget from '../../components/widgets/service/ServiceHorizontalWidget';
import DesignerHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import CelebrityHorizontalWidget from '../../components/widgets/user/CelebrityHorizontalWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from '../../I18n';
import ProductSearchForm from '../../components/widgets/search/ProductSearchForm';
import AndroidBackHandlerComponent from '../../components/AndroidBackHandlerComponent';
import AppHomeConfigComponent from '../../AppHomeConfigComponent';

const AbatiHomeScreen = ({
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
}) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  return (
    <View style={{flex: 1, backgroundColor: colors.main_theme_bg_color}}>
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
        <ProductSearchForm />
        {!validate.isEmpty(slides) ? (
          <MainSliderWidget slides={slides} />
        ) : null}
        {!validate.isEmpty(homeDesigners) && validate.isArray(homeDesigners) ? (
          <DesignerHorizontalWidget
            elements={homeDesigners}
            showName={true}
            name={I18n.t('designers')}
            title={I18n.t('designers')}
            searchElements={{is_designer: true}}
          />
        ) : null}
        {!validate.isEmpty(homeCategories) &&
        validate.isArray(homeCategories) ? (
          <ProductCategoryHorizontalRoundedWidget
            elements={homeCategories}
            showName={true}
            title={I18n.t('categories')}
            type="products"
          />
        ) : null}
        {!validate.isEmpty(homeCelebrities) &&
        validate.isArray(homeCelebrities) ? (
          <CelebrityHorizontalWidget
            elements={homeCelebrities}
            showName={true}
            name="celebrities"
            title={I18n.t('celebrities')}
            searchElements={{is_celebrity: true}}
          />
        ) : null}
        {!validate.isEmpty(homeProducts) ? (
          <ProductHorizontalWidget
            elements={homeProducts}
            showName={true}
            title={I18n.t('featured_products')}
          />
        ) : null}
        {!validate.isEmpty(brands) && validate.isArray(brands) ? (
          <BrandHorizontalWidget
            elements={brands}
            showName={false}
            title={I18n.t('brands')}
          />
        ) : null}
        {!validate.isEmpty(services) ? (
          <ServiceHorizontalWidget
            elements={services}
            showName={true}
            title={I18n.t('our_services')}
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

export default connect(mapStateToProps)(AbatiHomeScreen);

AbatiHomeScreen.propTypes = {
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
