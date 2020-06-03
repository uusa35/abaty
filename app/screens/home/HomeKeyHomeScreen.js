import React, {useState, useCallback} from 'react';
import {RefreshControl, ScrollView, View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import PropTypes from 'prop-types';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import validate from 'validate.js';
import I18n from '../../I18n';
import {
  ClassifiedCategoryHorizontalRoundedWidget,
  ClassifiedListHorizontal,
  HomeKeySearchTab,
} from '../../components/LazyLoadingComponents/classifiedComponents';
import NewClassifiedHomeBtn from '../../components/widgets/classified/NewClassifiedHomeBtn';
import IntroductionWidget from '../../components/widgets/splash/IntroductionWidget';
import DesignerHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import BgContainer from '../../components/containers/BgContainer';

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
  homeClassifieds,
  main_bg,
  splashes,
  splash_on,
}) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = useCallback(() => {
    dispatch(refetchHomeElements());
  }, [refresh]);

  return (
    <BgContainer showImage={false}>
      <View style={{margin: 0, padding: 0, flex: 1, height: '100%'}}>
        {!validate.isEmpty(splashes) && splash_on ? (
          <IntroductionWidget
            elements={splashes}
            showIntroduction={showIntroduction}
          />
        ) : null}
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
              title={I18n.t('featured_classifieds')}
              searchElements={{on_home: true}}
            />
          ) : null}
          {!validate.isEmpty(homeCompanies) &&
          validate.isArray(homeCompanies) ? (
            <DesignerHorizontalWidget
              elements={homeCompanies}
              showName={true}
              name={I18n.t('companies')}
              title={I18n.t('companies')}
              searchElements={{is_company: true}}
            />
          ) : null}
          <NewClassifiedHomeBtn />
        </ScrollView>
        {show_commercials ? (
          <View style={{flex: 0.2}}>
            {!validate.isEmpty(commercials) ? (
              <FixedCommercialSliderWidget sliders={commercials} />
            ) : null}
          </View>
        ) : null}
      </View>
    </BgContainer>
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
