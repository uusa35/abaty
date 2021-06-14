import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {text, width} from '../../constants/sizes';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import UserImageProfile from '../../components/widgets/user/UserImageProfile';
import PropTypes from 'prop-types';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import {getCelebrity} from '../../redux/actions/user';
import CommentScreenModal from './../CommentScreenModal';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ProductList from '../../components/widgets/product/ProductList';
import UserInfoWidget from '../../components/widgets/user/UserInfoWidget';
import I18n from '../../I18n';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import ProductCategoryVerticalWidget from '../../components/widgets/category/ProductCategoryVerticalWidget';
import {ABATI, ESCRAP, HOMEKEY, MALLR} from '../../../app';

const CelebrityShowScreen = ({navigation}) => {
  const {celebrity, commentModal, comments, guest, searchParams, settings} =
    useSelector(state => state);
  const dispatch = useDispatch();
  const {logo, colors} = settings;
  const [refresh, setRefresh] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'products', title: I18n.t('products')},
    {key: 'info', title: I18n.t('information').substring(0, 10)},
    {key: 'videos', title: I18n.t('videos')},
  ]);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [collectedCategories, setCollectedCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!validate.isEmpty(celebrity.products)) {
      setCollectedCategories(
        collectedCategories.concat(celebrity.productCategories),
      );
      setProducts(products.concat(celebrity.products));
    }
    if (!validate.isEmpty(celebrity.productGroup)) {
      setCollectedCategories(
        collectedCategories.concat(celebrity.productGroupCategories),
      );
      setProducts(products.concat(celebrity.productGroup));
    }
  }, [celebrity]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = useCallback(() => {
    return dispatch(
      getCelebrity({
        id: celebrity.id,
        searchParams: {user_id: celebrity.id},
      }),
    );
  }, [refresh]);

  return (
    <HeaderImageScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      maxHeight={150}
      minHeight={90}
      containerStyle={{flex: 1}}
      overlayColor="white"
      headerImage={{
        uri: celebrity.banner ? celebrity.banner : logo,
      }}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => handleRefresh()}
        />
      }>
      <View style={styles.wrapper}>
        <TriggeringView
        // onHide={() => console.log('text hidden')}
        >
          <UserImageProfile
            member_id={celebrity.id}
            showFans={true}
            showRating={ABATI || MALLR || ESCRAP || HOMEKEY}
            showComments={ABATI || MALLR || ESCRAP || (HOMEKEY && !guest)}
            guest={guest}
            isFanned={celebrity.isFanned}
            totalFans={celebrity.totalFans}
            currentRating={celebrity.rating}
            medium={celebrity.banner}
            logo={logo}
            slug={celebrity.slug}
            type={celebrity.role.slug}
            views={celebrity.views}
            commentsCount={celebrity.commentsCount}
          />
          {!validate.isEmpty(celebrity.slides) ? (
            <View style={{paddingTop: 10, paddingBottom: 10, width: width}}>
              <MainSliderWidget slides={celebrity.slides} />
            </View>
          ) : null}
          {!validate.isEmpty(collectedCategories) ? (
            <ProductCategoryVerticalWidget
              elements={collectedCategories}
              showImage={false}
              title={I18n.t('categories')}
            />
          ) : null}
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
              products: () => (
                <ProductList
                  products={products}
                  showSearch={false}
                  showTitle={true}
                  showFooter={false}
                  showMore={false}
                  searchElements={searchParams}
                />
              ),
              info: () => (
                <UserInfoWidget
                  has_map={celebrity.has_map}
                  mobile={celebrity.mobile}
                  phone={celebrity.phone}
                  slug={celebrity.slug}
                  whatsapp={celebrity.whatsapp}
                  twitter={celebrity.twitter}
                  facebook={celebrity.facebook}
                  instagram={celebrity.instagram}
                  android={celebrity.android}
                  youtube={celebrity.youtube}
                  website={celebrity.website}
                  description={celebrity.description}
                  service={celebrity.service}
                  address={celebrity.address}
                  images={celebrity.images}
                  latitude={celebrity.latitude}
                  longitude={celebrity.longitude}
                  thumb={celebrity.thumb}
                />
              ),
              videos: () => (
                <VideosVerticalWidget videos={celebrity.videoGroup} />
              ),
            })}
            style={{marginTop: 10, backgroundColor: 'white'}}
            onIndexChange={i => setIndex(i)}
            initialLayout={{width: width}}
          />
        </TriggeringView>
        <CommentScreenModal
          commentModal={commentModal}
          elements={comments}
          model="user"
          id={celebrity.id}
        />
      </View>
    </HeaderImageScrollView>
  );
};

CelebrityShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default CelebrityShowScreen;

CelebrityShowScreen.propTypes = {
  element: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
  commentModal: PropTypes.bool.isRequired,
};

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
