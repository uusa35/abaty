import React, {useContext, useState} from 'react';
import {RefreshControl, ScrollView, View, StyleSheet} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import PropTypes from 'prop-types';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
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
import BgContainer from '../../components/containers/BgContainer';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';

const DailyHomeScreen = () => {
  const {
    homeCategories,
    commercials,
    slides,
    brands,
    homeDesigners,
    homeCelebrities,
    homeProducts,
    splashes,
    show_commercials,
    services,
    showIntroduction,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRefresh = () => {
    dispatch(refetchHomeElements());
  };

  return (
    <BgContainer>
      <AppHomeConfigComponent />
      <IntroductionWidget
        elements={splashes}
        IntroductionWidget
        showIntroduction={showIntroduction}
      />
      <ScrollView
        contentContainerStyle={{backgroundColor: 'transparent'}}
        contentInset={{bottom: 50}}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => handleRefresh()}
          />
        }
        showsHorizontalScrollIndicator={false}
        endFillColor="white"
        showsVerticalScrollIndicator={false}
        style={{flex: 0.8}}>
        <ProductSearchForm />
        <MainSliderWidget elements={slides} />
        <DesignerHorizontalWidget
          elements={homeDesigners}
          showName={true}
          name={I18n.t('designers')}
          title={I18n.t('designers')}
          searchParams={{is_designer: 1}}
        />
        <ProductCategoryHorizontalRoundedWidget
          elements={homeCategories}
          showName={true}
          title={I18n.t('categories')}
          type="products"
        />
        <CelebrityHorizontalWidget
          elements={homeCelebrities}
          showName={true}
          name="celebrities"
          title={I18n.t('celebrities')}
          searchParams={{is_celebrity: 1}}
        />
        <ProductHorizontalWidget
          elements={homeProducts}
          showName={true}
          title={I18n.t('featured_products')}
        />
        {!validate.isEmpty(brands) && validate.isArray(brands) && (
          <BrandHorizontalWidget
            elements={brands}
            showName={false}
            title={I18n.t('brands')}
          />
        )}
        {!validate.isEmpty(services) && (
          <ServiceHorizontalWidget
            elements={services}
            showName={true}
            title={I18n.t('our_services')}
          />
        )}
      </ScrollView>
      {show_commercials ? (
        <View style={{flex: 0.2}}>
          {!validate.isEmpty(commercials) && (
            <FixedCommercialSliderWidget sliders={commercials} />
          )}
        </View>
      ) : null}
    </BgContainer>
  );
};

export default DailyHomeScreen;

DailyHomeScreen.propTypes = {
  // homeCategories: PropTypes.array,
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
