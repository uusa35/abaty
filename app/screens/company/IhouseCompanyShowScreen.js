import React, {useState, useCallback, useMemo, useContext} from 'react';
import {StyleSheet, RefreshControl, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {text, width, height, iconSizes} from '../../constants/sizes';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import {enableWarningMessage} from '../../redux/actions';
import {getDesigner} from '../../redux/actions/user';
import CommentScreenModal from './../CommentScreenModal';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import UserInfoWidget from '../../components/widgets/user/UserInfoWidget';
import I18n from '../../I18n';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import {ABATI, MALLR, HOMEKEY, ESCRAP} from './../../../app';
import UserImageProfileRounded from '../../components/widgets/user/UserImageProfileRounded';
import ElementsVerticalList from '../../components/Lists/ElementsVerticalList';
import {uniqBy, take} from 'lodash';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';
import BgContainer from '../../components/containers/BgContainer';
import ProductCategoryVerticalWidget from '../../components/widgets/category/ProductCategoryVerticalWidget';
import ImageLoaderContainer from '../../components/widgets/ImageLoaderContainer';
import {useNavigation} from '@react-navigation/native';

const IhouseCompanyShow = () => {
  const {company, comments, commentModal, searchParams, guest} = useSelector(
    state => state,
  );
  const {colors, logo} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [collectedCategories, setCollectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [currentSearchParams, setCurrentSearchParams] = useState({});
  const navigation = useNavigation();

  useMemo(() => {
    const currentRoutes = [
      {key: 'info', title: I18n.t('information').substring(0, 10)},
    ];
    if (!validate.isEmpty(company.videoGroup.video_url_one)) {
      currentRoutes.push({key: 'videos', title: I18n.t('videos')});
    }
    setRoutes(currentRoutes);
  }, [company]);

  useMemo(() => {
    if (company) {
      const filteredCategories = uniqBy(
        company.productCategories.concat(company.productGroupCategories),
        'id',
      );
      const filteredProducts = uniqBy(
        company.products.concat(company.productGroup),
        'id',
      );
      setProducts(filteredProducts);
      setCollectedCategories(take(filteredCategories, 5));
    } else {
      dispatch(enableWarningMessage(I18n.t('element_does_not_exist')));
      dispatch(navigation.goBack());
    }
    setCurrentSearchParams(searchParams);
  }, [company]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = useCallback(() => {
    return dispatch(
      getDesigner({
        id: company.id,
        searchParams: {user_id: company.id},
      }),
    );
  }, [refresh]);

  return (
    <BgContainer showImage={false}>
      <ScrollView
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        overlayColor="white"
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => handleRefresh()}
          />
        }>
        {!validate.isEmpty(company.slides) ? (
          <View style={{width: width}}>
            <MainSliderWidget elements={company.slides} />
          </View>
        ) : (
          <>
            {company.banner && !validate.isEmpty(company.banner) ? (
              <ImageLoaderContainer
                img={company.banner}
                style={{width: '100%', height: 200}}
                resizeMode={'cover'}
              />
            ) : (
              <ImageLoaderContainer
                img={logo}
                style={{width: '100%', height: 200}}
                resizeMode={'cover'}
              />
            )}
          </>
        )}
        <View style={styles.wrapper}>
          <TriggeringView
          // onHide={() => console.log('text hidden')}
          >
            <UserImageProfileRounded
              member_id={company.id}
              showFans={false}
              showRating={false}
              showComments={false}
              guest={guest}
              isFanned={company.isFanned}
              // totalFans={company.totalFans}
              // currentRating={company.rating}
              medium={company.medium}
              logo={logo}
              slug={company.slug}
              type={company.role.slug}
              views={company.views}
              commentsCount={company.commentsCount}
              mobile={company.mobile}
              phone={company.phone}
              whatsapp={company.whatsapp}
              twitter={company.twitter}
              facebook={company.facebook}
              instagram={company.instagram}
              youtube={company.youtube}
              website={company.website}
              // description={company.description}
              latitude={company.latitude}
              longitude={company.longitude}
            />
            {/*{!validate.isEmpty(collectedCategories) && (*/}
            {/*  <ProductCategoryVerticalWidget*/}
            {/*    elements={collectedCategories}*/}
            {/*    showImage={true}*/}
            {/*    title={I18n.t('categories')}*/}
            {/*    user_id={company.id}*/}
            {/*  />*/}
            {/*)}*/}
            <TabView
              lazy={true}
              renderTabBar={props => (
                <TabBar
                  {...props}
                  // tabStyle={{ backgroundColor: 'white'}}
                  // indicatorContainerStyle={{backgroundColor: 'white'}}
                  // contentContainerStyle={{backgroundColor: 'white'}}
                  indicatorStyle={{
                    backgroundColor: colors.btn_bg_theme_color,
                  }}
                  activeColor={colors.header_one_theme_color}
                  inactiveColor={colors.header_tow_theme_color}
                  style={{backgroundColor: 'white'}}
                  labelStyle={{
                    fontFamily: text.font,
                    fontSize: text.small,
                  }}
                />
              )}
              navigationState={{
                index,
                routes,
              }}
              renderScene={SceneMap({
                info: () => (
                  <UserInfoWidget
                    has_map={company.has_map}
                    mobile={company.mobile}
                    phone={company.phone}
                    slug={company.slug}
                    whatsapp={company.whatsapp}
                    twitter={company.twitter}
                    facebook={company.facebook}
                    instagram={company.instagram}
                    android={company.android}
                    youtube={company.youtube}
                    website={company.website}
                    description={company.description}
                    service={company.service}
                    address={company.address}
                    images={company.images}
                    latitude={company.latitude}
                    longitude={company.longitude}
                    thumb={company.thumb}
                  />
                ),
                videos: () => (
                  <VideosVerticalWidget videos={company.videoGroup} />
                ),
              })}
              style={{backgroundColor: 'white', minHeight: height / 2}}
              onIndexChange={i => setIndex(i)}
              initialLayout={{width: width}}
            />
          </TriggeringView>
          <CommentScreenModal
            commentModal={commentModal}
            elements={comments}
            model="user"
            id={company.id}
          />
        </View>
      </ScrollView>
    </BgContainer>
  );
};

export default IhouseCompanyShow;

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.medium,
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  wrapper: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'lightgrey',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5,
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  scene: {
    flex: 1,
  },
});
