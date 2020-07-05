import React, {useContext, Fragment} from 'react';
import {
  RefreshControl,
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {refetchHomeElements} from '../../redux/actions';
import {bottomContentInset, touchOpacity} from '../../constants/sizes';
import PropTypes from 'prop-types';
import FixedCommercialSliderWidget from '../../components/widgets/FixedCommercialSliderWidget';
import validate from 'validate.js';
import I18n from '../../I18n';
import NewClassifiedHomeBtn from '../../components/widgets/classified/NewClassifiedHomeBtn';
import EscrapSearchTab from '../../components/widgets/search/EscrapSearchTab';
import DesignersHorizontalWidget from '../../components/widgets/user/DesignerHorizontalWidget';
import BgContainer from '../../components/containers/BgContainer';
import widgetStyles from '../../components/widgets/widgetStyles';
import {text, width} from '../../constants/sizes';
import ImageLoaderContainer from '../../components/widgets/ImageLoaderContainer';
import {setCategoryAndGoToNavChildren} from '../../redux/actions/category';
import {map} from 'lodash';
import AppHomeConfigComponent from '../../components/containers/AppHomeConfigComponent';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import ClassifiedCategoryHorizontalRoundedWidget from '../../components/widgets/category/ClassifiedCategoryHorizontalRoundedWidget';
import CommercialSliderWidget from '../../components/widgets/CommercialSliderWidget';
import ClassifiedListHorizontal from '../../components/widgets/classified/ClassifiedListHorizontal';

const EscrapHomeScreen = () => {
  const {
    categories,
    commercials,
    settings,
    homeCompanies,
    homeClassifieds,
    homeUserCategories,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleRefresh = () => {
    dispatch(refetchHomeElements());
  };

  return (
    <BgContainer enableMargin={true} marginVal="21%">
      <AppHomeConfigComponent />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => handleRefresh()}
          />
        }
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingTop: '30%'}}
        style={{flex: settings.show_commercials ? 0.8 : 1}}
        contentInset={{bottom: bottomContentInset}}>
        <EscrapSearchTab
          elements={categories}
          onlyCompanySearchTextInput={true}
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
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          {map(homeUserCategories, (c, i) => (
            <TouchableOpacity
              activeOpacity={touchOpacity}
              key={i}
              onPress={() => dispatch(setCategoryAndGoToNavChildren(c))}>
              <ImageLoaderContainer
                style={{width: width, height: width / 1.5, paddingBottom: 3}}
                resizeMode="stretch"
                img={c.thumb}
              />
              {c.is_featured && (
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
              )}
            </TouchableOpacity>
          ))}
        </View>
        {!validate.isEmpty(homeClassifieds) && (
          <Fragment>
            {/*{!validate.isEmpty(homeClassifiedCategories) &&*/}
            {/*  validate.isArray(homeClassifiedCategories) && (*/}
            {/*    <ClassifiedCategoryHorizontalRoundedWidget*/}
            {/*      elements={homeClassifiedCategories}*/}
            {/*      showName={true}*/}
            {/*      showLink={true}*/}
            {/*      title={I18n.t('for_sale')}*/}
            {/*    />*/}
            {/*  )}*/}
            <ClassifiedListHorizontal
              classifieds={homeClassifieds}
              showName={true}
              showSearch={false}
              showTitle={true}
              title={I18n.t('recent_classifieds')}
              searchElements={{on_home: 1}}
            />
            <NewClassifiedHomeBtn />
          </Fragment>
        )}
      </ScrollView>
      {settings.show_commercials && (
        <View style={{flex: 0.2}}>
          {!validate.isEmpty(commercials) && (
            <CommercialSliderWidget commercials={commercials} />
          )}
        </View>
      )}
    </BgContainer>
  );
};

export default EscrapHomeScreen;

const styles = StyleSheet.create({
  safeContainer: {
    paddingRight: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
