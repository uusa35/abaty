import React, {useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
  BackHandler,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import PropTypes from 'prop-types';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import validate from 'validate.js';
import BrandHorizontalWidget from '../../components/widgets/brand/BrandHorizontalWidget';
import ProductHorizontalWidget from '../../components/widgets/product/ProductHorizontalWidget';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import ServiceHorizontalWidget from '../../components/widgets/service/ServiceHorizontalWidget';
import DesignersHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import CelebrityHorizontalWidget from '../../components/widgets/user/CelebrityHorizontalWidget';
import ProductCategoryHorizontalRoundedWidget from '../../components/widgets/category/ProductCategoryHorizontalRoundedWidget';
import I18n from '../../I18n';
import ProductSearchForm from '../../components/widgets/search/ProductSearchForm';
import BgContainer from '../../components/containers/BgContainer';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';
import {bottomContentInset} from '../../constants/sizes';

const DesigneratHomeScreen = () => {
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
    homeCompanies,
    country,
    settings,
  } = useSelector(state => state);
  const dispatch = useDispatch();

  const handleRefresh = () => dispatch(refetchHomeElements());

  return (
    <BgContainer showImage={false} white={true}>
      <AppHomeConfigComponent />
      {settings.splash_on && (
        <IntroductionWidget
          elements={splashes}
          IntroductionWidget
          showIntroduction={showIntroduction}
        />
      )}
      <ScrollView
        contentContainerStyle={{
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
        <MainSliderWidget elements={slides} />
        {homeCelebrities && (
          <CelebrityHorizontalWidget
            elements={homeCelebrities}
            showName={true}
            rounded={false}
            showAll={true}
            name="celebrities"
            title={I18n.t('designerat_app.celebrities')}
            width={120}
            height={135}
            searchParams={{
              is_celebrity: 1,
              country_id: country.id,
              on_home: 1,
            }}
          />
        )}
        {homeCompanies && (
          <DesignersHorizontalWidget
            elements={homeCompanies}
            showName={true}
            type="company"
            title={I18n.t('designerat_app.elites')}
            width={120}
            height={120}
            rounded={true}
            showAll={true}
            searchParams={{is_company: 1, country_id: country.id, on_home: 1}}
          />
        )}
        {homeDesigners && (
          <DesignersHorizontalWidget
            elements={homeDesigners}
            showName={true}
            type="designer"
            title={I18n.t('designerat_app.designers')}
            showAll={true}
            rounded={true}
            searchParams={{is_designer: 1, country_id: country.id, on_home: 1}}
          />
        )}
      </ScrollView>
    </BgContainer>
  );
};

export default DesigneratHomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
