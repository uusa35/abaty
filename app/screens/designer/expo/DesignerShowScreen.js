import React, {useState, useCallback, useMemo} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {text, width, height} from '../../../constants/sizes';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import PropTypes from 'prop-types';
import MainSliderWidget from '../../../components/widgets/slider/MainSliderWidget';
import {enableWarningMessage} from '../../../redux/actions';
import {getDesigner} from '../../../redux/actions/user';
import CommentScreenModal from './../../CommentScreenModal';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import ProductList from '../../../components/widgets/product/ProductList';
import UserInfoWidget from '../../../components/widgets/user/UserInfoWidget';
import I18n from '../../../I18n';
import VideosVerticalWidget from '../../../components/widgets/video/VideosVerticalWidget';
import {ABATI, MALLR, HOMEKEY, ESCRAP} from './../../../../app';
import UserImageProfileRounded from '../../../components/widgets/user/UserImageProfileRounded';
import ElementsVerticalList from '../../../components/Lists/ElementsVerticalList';
import {uniqBy, take} from 'lodash';

const DesignerShowScreen = ({
  element,
  commentModal,
  comments,
  dispatch,
  colors,
  logo,
  guest,
  searchParams,
  navigation,
}) => {
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

  useMemo(() => {
    if (element) {
      const filteredCategories = uniqBy(
        element.productCategories.concat(element.productGroupCategories),
        'id',
      );
      const filteredProducts = uniqBy(
        element.products.concat(element.productGroup),
        'id',
      );
      setProducts(filteredProducts);
      setCollectedCategories(take(filteredCategories, 5));
    } else {
      dispatch(enableWarningMessage(I18n.t('element_does_not_exist')));
      return dispatch(navigation.goBack());
    }
  }, [element]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = useCallback(() => {
    return dispatch(
      getDesigner({
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
      containerStyle={{flex: 1}}
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
          <UserImageProfileRounded
            member_id={element.id}
            showFans={true}
            showRating={ABATI || MALLR || ESCRAP || HOMEKEY}
            showComments={ABATI || MALLR || ESCRAP || (HOMEKEY && !guest)}
            guest={guest}
            isFanned={element.isFanned}
            totalFans={element.totalFans}
            currentRating={element.rating}
            medium={element.medium}
            logo={logo}
            slug={element.slug}
            type={element.role.slug}
            views={element.views}
            commentsCount={element.commentsCount}
            mobile={element.mobile}
            phone={element.phone}
            whatsapp={element.whatsapp}
            twitter={element.twitter}
            facebook={element.facebook}
            instagram={element.instagram}
            youtube={element.youtube}
            website={element.website}
            description={element.description}
            latitude={element.latitude}
            longitude={element.longitude}
          />
          {!validate.isEmpty(element.slides) ? (
            <View style={{width: width}}>
              <MainSliderWidget slides={element.slides} />
            </View>
          ) : null}
          {!validate.isEmpty(collectedCategories) ? (
            <ElementsVerticalList
              elements={collectedCategories}
              showMore={false}
              showFooter={false}
              showSearch={false}
              showTitle={true}
              type="category"
              title={I18n.t('categories')}
            />
          ) : null}
          <TabView
            lazy={true}
            renderTabBar={(props) => (
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
                  showTitleIcons={true}
                  showFooter={false}
                  showMore={false}
                  searchElements={searchParams}
                />
              ),
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
            style={{backgroundColor: 'white', minHeight: height / 2}}
            onIndexChange={(i) => setIndex(i)}
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

DesignerShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default connect(mapStateToProps)(DesignerShowScreen);

DesignerShowScreen.propTypes = {
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
