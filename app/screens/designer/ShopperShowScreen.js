import React, {useState, useCallback, useMemo} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {text, width} from '../../constants/sizes';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import {getCompany} from '../../redux/actions/user';
import CommentScreenModal from './../CommentScreenModal';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import UserInfoWidget from '../../components/widgets/user/UserInfoWidget';
import I18n from '../../I18n';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import ProductCategoryVerticalWidget from '../../components/widgets/category/ProductCategoryVerticalWidget';
import CollectionGridWidget from '../../components/widgets/collection/CollectionGridWidget';
import ShopperImageProfile from '../../components/widgets/user/ShopperImageProfile';
import {ABATI, MALLR, HOMEKEY, ESCRAP} from '../../../app';

const ShopperShowScreen = ({
  element,
  commentModal,
  comments,
  dispatch,
  colors,
  logo,
  guest,
  searchParams,
  navigation,
  showSlider = false,
  showTabs = false,
}) => {
  const [refresh, setRefresh] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'info', title: I18n.t('information').substring(0, 10)},
    {key: 'videos', title: I18n.t('videos')},
  ]);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [collectedCategories, setCollectedCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useMemo(() => {
    if (!validate.isEmpty(element.products)) {
      setCollectedCategories(
        collectedCategories.concat(element.productCategories),
      );
      setProducts(products.concat(element.products));
    }
    if (!validate.isEmpty(element.productGroup)) {
      setCollectedCategories(
        collectedCategories.concat(element.productGroupCategories),
      );
      setProducts(products.concat(element.productGroup));
    }
  }, [element]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = useCallback(() => {
    return dispatch(
      getCompany({
        id: element.id,
        searchParams: {user_id: element.id},
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
      containerStyle={{flex: 1, backgroundColor: 'white'}}
      overlayColor="white"
      headerImage={{
        uri: element.banner ? element.banner : logo,
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
          {!validate.isEmpty(element) ? (
            <ShopperImageProfile
              member_id={element.id}
              showFans={true}
              showRating={ABATI || MALLR || ESCRAP || HOMEKEY}
              showComments={ABATI || MALLR || ESCRAP || (HOMEKEY && !guest)}
              isFanned={element.isFanned}
              totalFans={element.totalFans}
              currentRating={element.rating}
              medium={element.medium}
              logo={logo}
              slug={element.slug}
              type={element.role.slug}
              views={element.views}
              commentsCount={element.commentsCount}
            />
          ) : null}
          {!validate.isEmpty(element.collections) ? (
            <CollectionGridWidget elements={element.collections} />
          ) : null}
          {!validate.isEmpty(element.slides) && showSlider ? (
            <View style={{paddingTop: 10, paddingBottom: 10, width: width}}>
              <MainSliderWidget slides={element.slides} />
            </View>
          ) : null}
          {!validate.isEmpty(collectedCategories) ? (
            <ProductCategoryVerticalWidget
              user_id={element.id}
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
              info: () => (
                <UserInfoWidget
                  has_map={element.has_map}
                  mobile={element.mobile}
                  phone={element.phone}
                  slug={element.slug}
                  whatsapp={element.whatsapp}
                  twitter={element.twitter}
                  facebook={element.facebook}
                  instagram={element.instagram}
                  android={element.android}
                  youtube={element.youtube}
                  website={element.website}
                  description={element.description}
                  service={element.service}
                  address={element.address}
                  images={element.images}
                  latitude={element.latitude}
                  longitude={element.longitude}
                  thumb={element.thumb}
                />
              ),
              videos: () => (
                <VideosVerticalWidget videos={element.videoGroup} />
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
          id={element.id}
        />
      </View>
    </HeaderImageScrollView>
  );
};

function mapStateToProps(state) {
  return {
    element: state.designer,
    comments: state.comments,
    commentModal: state.commentModal,
    searchParams: state.searchParams,
    colors: state.settings.colors,
    logo: state.settings.logo,
    guest: state.guest,
  };
}

ShopperShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor,
  },
});

export default connect(mapStateToProps)(ShopperShowScreen);

ShopperShowScreen.propTypes = {
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
    backgroundColor: 'white',
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
