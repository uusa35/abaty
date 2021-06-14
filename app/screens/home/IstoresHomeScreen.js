import React from 'react';
import {RefreshControl, ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from '../../I18n';
import ExpoMainSliderWidget from '../../components/widgets/slider/ExpoMainSliderWidget';
import ExpoDesignerHorizontalWidget from '../../components/widgets/user/ExpoDesignerHorizontalWidget';
import BgContainer from '../../components/containers/BgContainer';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';
import {bottomContentInset} from '../../constants/sizes';
import CompanyCategoryHorizontalWidget from '../../components/widgets/category/CompanyCategoryHorizontalWidget';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';
import {filter} from 'lodash';

const IstoresHomeScreen = () => {
  const {
    homeCategories,
    homeUserCategories,
    commercials,
    slides,
    brands,
    homeDesigners,
    homeCelebrities,
    homeProducts,
    bestSaleProducts,
    latestProducts,
    hotDealsProducts,
    homeCompanies,
    splashes,
    services,
    showIntroduction,
    mainBg,
    country,
    areas,
    settings,
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleRefresh = () => dispatch(refetchHomeElements());

  return (
    <BgContainer showImage={true} white={true}>
      {settings.splash_on && (
        <IntroductionWidget
          elements={splashes}
          IntroductionWidget
          showIntroduction={showIntroduction}
        />
      )}
      <ScrollView
        contentContainerStyle={{
          marginTop: 10,
          backgroundColor: 'transparent',
        }}
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        endFillColor="white"
        style={{
          paddingBottom: bottomContentInset,
          backgroundColor: 'transparent',
        }}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => handleRefresh()}
          />
        }>
        {/*<ProductSearchForm />*/}
        <ExpoMainSliderWidget elements={slides} />
        {/* expo is a designer */}
        {!validate.isEmpty(brands) && validate.isArray(brands) && (
          <BrandHorizontalWidget
            elements={brands}
            showName={false}
            title={I18n.t('brands')}
          />
        )}
        {homeUserCategories && (
          <CompanyCategoryHorizontalWidget
            elements={homeUserCategories}
            showName={true}
            title={I18n.t('istores.user_categories')}
            type="companies"
          />
        )}
        {homeCompanies && (
          <ExpoDesignerHorizontalWidget
            elements={homeCompanies}
            showName={true}
            name={I18n.t('istores.participated_stores')}
            title={I18n.t('istores.participated_stores')}
            searchElements={{is_company: 1, country_id: country.id}}
          />
        )}
        {homeDesigners && (
          <ExpoDesignerHorizontalWidget
            elements={homeDesigners}
            showName={true}
            name={I18n.t('istores.small_business')}
            title={I18n.t('istores.small_business')}
            searchElements={{is_designer: 1, country_id: country.id}}
          />
        )}
        {homeCategories && (
          <ProductCategoryHorizontalRoundedWidget
            elements={filter(homeCategories, c => c.is_product)}
            showName={true}
            showAll={true}
            title={I18n.t('istores.product_categories')}
            type="products"
          />
        )}
        {homeProducts && (
          <ProductHorizontalWidget
            elements={homeProducts}
            showName={true}
            title={I18n.t('chosen_products')}
            searchParams={{on_home: 1, country_id: country.id}}
          />
        )}
        {latestProducts && (
          <ProductHorizontalWidget
            elements={latestProducts}
            showName={true}
            title={I18n.t('recentest_products')}
            searchParams={{on_home: 1, country_id: country.id}}
          />
        )}
        {hotDealsProducts && (
          <ProductHorizontalWidget
            elements={hotDealsProducts}
            showName={true}
            title={I18n.t('hot_deals_products')}
            searchParams={{
              on_home: 1,
              country_id: country.id,
              on_sale: 1,
              hot_deal: 1,
            }}
          />
        )}
        {/*<ExpoHomeScreenBtns />*/}
      </ScrollView>
      <AppHomeConfigComponent />
    </BgContainer>
  );
};

export default IstoresHomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
