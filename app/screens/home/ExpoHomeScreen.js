import React from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
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
import ExpoMainSliderWidget from '../../components/widgets/slider/ExpoMainSliderWidget';
import ExpoDesignerHorizontalWidget from '../../components/widgets/user/ExpoDesignerHorizontalWidget';
import ExpoHomeScreenBtns from '../../components/widgets/home/ExpoHomeScreenBtns';
import BgContainer from '../../components/containers/BgContainer';
import DesignersHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';
import {bottomContentInset} from '../../constants/sizes';

const ExpoHomeScreen = () => {
  const {
    homeCategories,
    commercials,
    slides,
    brands,
    homeDesigners,
    homeCelebrities,
    homeProducts,
    homeCompanies,
    splashes,
    splash_on,
    show_commercials,
    services,
    showIntroduction,
    mainBg,
    country,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleRefresh = () => dispatch(refetchHomeElements());

  return (
    <BgContainer>
      <AppHomeConfigComponent />
      <IntroductionWidget
        elements={splashes}
        IntroductionWidget
        showIntroduction={showIntroduction}
      />
      <ScrollView
        contentContainerStyle={{
          backgroundColor: 'transparent',
          marginTop: '25%',
        }}
        contentInset={{bottom: bottomContentInset}}
        horizontal={false}
        scrollEnabled={true}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        endFillColor="white"
        style={{
          flex: 0.8,
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
        <ExpoDesignerHorizontalWidget
          elements={homeDesigners}
          showName={true}
          name={I18n.t('expos')}
          title={I18n.t('expos')}
          searchElements={{is_designer: 1, country_id: country.id}}
        />
        <ExpoDesignerHorizontalWidget
          elements={homeCompanies}
          showName={true}
          name={I18n.t('small_business')}
          title={I18n.t('small_business')}
          searchElements={{is_company: 1, country_id: country.id}}
        />
        <View>
          <ExpoHomeScreenBtns />
        </View>
      </ScrollView>
      {show_commercials && (
        <View style={{flex: 0.2, borderWidth: 5, borderColor: 'orange'}}>
          {!validate.isEmpty(commercials) && (
            <FixedCommercialSliderWidget sliders={commercials} />
          )}
        </View>
      )}
    </BgContainer>
  );
};

export default ExpoHomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
