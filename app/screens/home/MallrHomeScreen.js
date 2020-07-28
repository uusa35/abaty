import React, {
  Component,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from 'react';
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
} from '../../redux/actions';
import PropTypes from 'prop-types';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from './../../I18n';
import ShopperHorizontalWidget from '../../components/widgets/user/ShopperHorizontalWidget';
import DesignersHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import BgContainer from '../../components/containers/BgContainer';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';

const MallrHomeScreen = ({
  homeCategories,
  commercials,
  slides,
  brands,
  homeDesigners,
  bestSaleProducts,
  latestProducts,
  hotDealsProducts,
  onSaleProducts,
  homeCollections,
  splash_on,
  splashes,
  show_commercials,
  colors,
  showIntroduction,
  homeCompanies,
  dispatch,
}) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  return (
    <BgContainer>
      <AppHomeConfigComponent />
      <View style={{flex: 1, backgroundColor: colors.main_theme_bg_color}}>
        {!validate.isEmpty(splashes) && splash_on && (
          <IntroductionWidget
            elements={splashes}
            showIntroduction={showIntroduction}
          />
        )}
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
          {!validate.isEmpty(slides) && <MainSliderWidget slides={slides} />}
          {!validate.isEmpty(homeDesigners) &&
            validate.isArray(homeDesigners) && (
              <ShopperHorizontalWidget
                elements={homeDesigners}
                showName={true}
                name={I18n.t('mallr.personal_shoppers')}
                title={I18n.t('mallr.personal_shoppers')}
                searchElements={{is_designer: true}}
              />
            )}
          {homeCompanies && (
            <DesignersHorizontalWidget
              elements={homeCompanies}
              showName={true}
              name={I18n.t('our_joined_companies')}
              title={I18n.t('our_joined_companies')}
              searchElements={{is_company: true}}
            />
          )}
          {!validate.isEmpty(homeCategories) &&
            validate.isArray(homeCategories) && (
              <ProductCategoryHorizontalRoundedWidget
                elements={homeCategories}
                showName={true}
                title={I18n.t('categories')}
                type="products"
              />
            )}
          {!validate.isEmpty(latestProducts) && (
            <ProductHorizontalWidget
              elements={latestProducts}
              showName={true}
              title={I18n.t('latest_products')}
            />
          )}
          {!validate.isEmpty(onSaleProducts) && (
            <ProductHorizontalWidget
              elements={onSaleProducts}
              showName={true}
              title={I18n.t('on_sale_products')}
            />
          )}
          {!validate.isEmpty(bestSaleProducts) && (
            <ProductHorizontalWidget
              elements={bestSaleProducts}
              showName={true}
              title={I18n.t('best_sale_products')}
            />
          )}
          {!validate.isEmpty(hotDealsProducts) && (
            <ProductHorizontalWidget
              elements={hotDealsProducts}
              showName={true}
              title={I18n.t('hot_deals_products')}
              showLink={false}
            />
          )}
          {!validate.isEmpty(brands) && validate.isArray(brands) && (
            <BrandHorizontalWidget
              elements={brands}
              showName={false}
              title={I18n.t('brands')}
            />
          )}
          {/*{!validate.isEmpty(homeCollections) &&*/}
          {/*  <CollectionHorizontalWidget*/}
          {/*    elements={homeCollections}*/}
          {/*    showName={true}*/}
          {/*    title={I18n.t('our_collections')}*/}
          {/*  />*/}
          {/*}*/}
        </ScrollView>
        {show_commercials && (
          <View style={{flex: 0.2}}>
            {!validate.isEmpty(commercials) && (
              <FixedCommercialSliderWidget sliders={commercials} />
            )}
          </View>
        )}
      </View>
    </BgContainer>
  );
};

function mapStateToProps(state) {
  return {
    homeCategories: state.homeCategories,
    brands: state.brands,
    homeDesigners: state.homeDesigners,
    homeCelebrities: state.homeCelebrities,
    bestSaleProducts: state.bestSaleProducts,
    latestProducts: state.latestProducts,
    hotDealsProducts: state.hotDealsProducts,
    onSaleProducts: state.onSaleProducts,
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
    homeCompanies: state.homeCompanies,
  };
}

export default connect(mapStateToProps)(MallrHomeScreen);

MallrHomeScreen.propTypes = {
  homeCategories: PropTypes.array,
  brands: PropTypes.array,
  homeDesigners: PropTypes.array,
  homeProducts: PropTypes.array,
  homeCollections: PropTypes.array,
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
