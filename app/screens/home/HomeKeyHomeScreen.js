import React, {useMemo, useState} from 'react';
import {RefreshControl, ScrollView, View, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
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
import DesignersHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import BgContainer from '../../components/containers/BgContainer';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';
import UsersHorizontalWidget from '../../components/widgets/user/UsersHorizontalWidget';
import {useNavigation} from 'react-navigation-hooks';

const HomeKeyHomeScreen = () => {
  const {
    homeCategories,
    categories,
    commercials,
    settings,
    slides,
    show_commercials,
    showIntroduction,
    homeCompanies,
    homeClassifieds,
    splash_on,
  } = useSelector((state) => state);
  const {colors, main_bg, splashes} = settings;
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');

  useMemo(() => {
    navigation.navigationOptions = ({navigation}) => ({
      headerTransparent: navigation.state.params.headerBg,
      headerStyle: {
        backgroundColor: navigation.state.params.headerBgColor,
      },
    });
  }, [headerBg]);

  const handleRefresh = () => {
    dispatch(refetchHomeElements());
  };

  return (
    <BgContainer showImage={false}>
      <AppHomeConfigComponent />
      <View style={{margin: 0, padding: 0, flex: 1, height: '100%'}}>
        {!validate.isEmpty(splashes) && splash_on && (
          <IntroductionWidget
            elements={splashes}
            showIntroduction={showIntroduction}
          />
        )}
        {!validate.isEmpty(splashes) && splash_on && (
          <IntroductionWidget
            elements={splashes}
            showIntroduction={showIntroduction}
          />
        )}
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
          {!validate.isEmpty(slides) && <MainSliderWidget slides={slides} />}
          {!validate.isEmpty(categories) && validate.isArray(categories) && (
            <HomeKeySearchTab elements={categories} main_bg={main_bg} />
          )}
          {!validate.isEmpty(homeCategories) &&
            validate.isArray(homeCategories) && (
              <ClassifiedCategoryHorizontalRoundedWidget
                elements={homeCategories}
                showName={true}
                title={I18n.t('categories')}
              />
            )}
          {!validate.isEmpty(homeClassifieds) &&
            validate.isArray(homeClassifieds) && (
              <ClassifiedListHorizontal
                classifieds={homeClassifieds}
                showName={true}
                showSearch={false}
                showTitle={true}
                title={I18n.t('featured_classifieds')}
                searchElements={{on_home: true}}
              />
            )}
          {!validate.isEmpty(homeCompanies) &&
            validate.isArray(homeCompanies) && (
              <UsersHorizontalWidget
                type="company"
                elements={homeCompanies}
                showName={true}
                name={I18n.t('companies')}
                title={I18n.t('companies')}
                searchParams={{is_company: 1}}
              />
            )}
          <NewClassifiedHomeBtn />
        </ScrollView>
        {show_commercials ? (
          <View style={{flex: 0.2}}>
            {!validate.isEmpty(commercials) && (
              <FixedCommercialSliderWidget sliders={commercials} />
            )}
          </View>
        ) : null}
      </View>
    </BgContainer>
  );
};

export default HomeKeyHomeScreen;

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
