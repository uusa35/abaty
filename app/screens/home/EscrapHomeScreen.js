import React, {useState, useCallback} from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import {bottomContentInset, touchOpacity} from '../../constants/sizes';
import PropTypes from 'prop-types';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import validate from 'validate.js';
import I18n from '../../I18n';
import {ClassifiedListHorizontal} from '../../components/LazyLoadingComponents/classifiedComponents';
import NewClassifiedHomeBtn from '../../components/widgets/classified/NewClassifiedHomeBtn';
import EscrapSearchTab from '../../components/widgets/search/EscrapSearchTab';
import DesignerHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import BgContainer from '../../components/containers/BgContainer';
import widgetStyles from '../../components/widgets/widgetStyles';
import {text} from '../../constants/sizes';
import ImageLoaderContainer from '../../components/widgets/ImageLoaderContainer';
import {setCategoryAndGoToNavChildren} from '../../redux/actions/category';
import {map} from 'lodash';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';

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
  dispatch,
}) => {
  const handleRefresh = () => {
    dispatch(refetchHomeElements());
  };

  return (
    <BgContainer showImage={false}>
      <AppHomeConfigComponent />
      <View
        style={{
          margin: 0,
          padding: 0,
          flex: 1,
          height: '100%',
          backgroundColor: colors.main_theme_bg_color,
        }}>
        <ScrollView
          contentContainerStyle={{
            backgroundColor: colors.main_theme_bg_color,
          }}
          contentInset={{bottom: bottomContentInset}}
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
          <EscrapSearchTab
            elements={categories}
            main_bg={main_bg}
            onlyTextForm={true}
          />
          {/*{!validate.isEmpty(homeUserCategories) &&*/}
          {/*validate.isArray(homeUserCategories) ? (*/}
          {/*  <NavCategoryHorizontalRoundedWidget*/}
          {/*    elements={homeUserCategories}*/}
          {/*    showName={true}*/}
          {/*    showTitle={true}*/}
          {/*    showLink={true}*/}
          {/*    title={I18n.t('shops')}*/}
          {/*  />*/}
          {/*) : null}*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              paddingTop: 20,
              paddingBottom: 10,
            }}>
            {map(homeUserCategories, (c, i) => (
              <TouchableOpacity
                activeOpacity={touchOpacity}
                key={i}
                style={widgetStyles.btnStyle}
                onPress={() => dispatch(setCategoryAndGoToNavChildren(c))}>
                <ImageLoaderContainer
                  img={c.thumb}
                  style={{width: 150, height: 140, borderRadius: 20}}
                  resizeMode="cover"
                />
                <Text
                  style={[
                    widgetStyles.elementName,
                    {
                      color: colors.header_tow_theme_color,
                      fontSize: text.large,
                    },
                  ]}>
                  {c.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {/*{!validate.isEmpty(homeClassifiedCategories) &&*/}
          {/*validate.isArray(homeClassifiedCategories) ? (*/}
          {/*  <ClassifiedCategoryHorizontalRoundedWidget*/}
          {/*    elements={homeClassifiedCategories}*/}
          {/*    showName={true}*/}
          {/*    showLink={true}*/}
          {/*    title={I18n.t('for_sale')}*/}
          {/*  />*/}
          {/*) : null}*/}
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
