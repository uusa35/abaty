import React, {useState, useMemo, useContext} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {text, width} from '../../../constants/sizes';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import UserImageProfile from '../../../components/widgets/user/UserImageProfile';
import PropTypes from 'prop-types';
import MainSliderWidget from '../../../components/widgets/slider/MainSliderWidget';
import {enableWarningMessage} from '../../../redux/actions';
import {getDesigner} from '../../../redux/actions/user';
import CommentScreenModal from './../../CommentScreenModal';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import UserInfoWidget from '../../../components/widgets/user/UserInfoWidget';
import I18n from '../../../I18n';
import VideosVerticalWidget from '../../../components/widgets/video/VideosVerticalWidget';
import ProductCategoryVerticalWidget from '../../../components/widgets/category/ProductCategoryVerticalWidget';
import {ABATI, MALLR, HOMEKEY, ESCRAP} from './../../../../app';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import ElementsHorizontalList from '../../../components/Lists/ElementsHorizontalList';
import BgContainer from '../../../components/containers/BgContainer';

const DesignerShowScreen = ({navigation}) => {
  const {designer, comments, commentModal, searchParams, guest} = useSelector(
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

  useMemo(() => {
    const currentRoutes = [
      {key: 'products', title: I18n.t('products')},
      {key: 'info', title: I18n.t('information').substring(0, 10)},
    ];
    if (!validate.isEmpty(designer.videoGroup.video_url_one)) {
      currentRoutes.push({key: 'videos', title: I18n.t('videos')});
    }
    setRoutes(currentRoutes);
  }, [designer]);

  useMemo(() => {
    if (designer) {
      if (!validate.isEmpty(designer.products)) {
        setCollectedCategories(
          collectedCategories.concat(designer.productCategories),
        );
        setProducts(products.concat(designer.products));
      }
      if (!validate.isEmpty(designer.productGroup)) {
        setCollectedCategories(
          collectedCategories.concat(designer.productGroupCategories),
        );
        setProducts(products.concat(designer.productGroup));
      }
    } else {
      dispatch(enableWarningMessage(I18n.t('element_does_not_exist')));
      return dispatch(navigation.goBack());
    }
    setCurrentSearchParams(searchParams);
  }, [designer]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = () => {
    return dispatch(
      getDesigner({
        id: designer.id,
        searchParams: {user_id: designer.id},
      }),
    );
  };

  return (
    <BgContainer showImage={false}>
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
          uri: designer.banner ? designer.banner : logo,
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
              member_id={designer.id}
              showFans={!ABATI}
              showRating={ABATI || MALLR || ESCRAP || HOMEKEY}
              showComments={ABATI || MALLR || ESCRAP || (HOMEKEY && !guest)}
              guest={guest}
              isFanned={designer.isFanned}
              totalFans={designer.totalFans}
              currentRating={designer.rating}
              medium={designer.banner}
              logo={logo}
              slug={designer.slug}
              type={designer.role.slug}
              views={designer.views}
              commentsCount={designer.commentsCount}
            />
            {!validate.isEmpty(designer.slides) && (
              <View style={{paddingTop: 10, paddingBottom: 10, width: width}}>
                <MainSliderWidget elements={designer.slides} />
              </View>
            )}
            {!validate.isEmpty(collectedCategories) && (
              <ProductCategoryVerticalWidget
                elements={collectedCategories}
                user_id={designer.id}
                showImage={false}
                title={I18n.t('categories')}
              />
            )}
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
                  <ElementsHorizontalList
                    elements={products}
                    searchParams={currentSearchParams}
                    type="product"
                    columns={2}
                    showSearch={false}
                    showTitle={true}
                    showTitleIcons={true}
                    showFooter={false}
                    showMore={false}
                  />
                ),
                info: () => (
                  <UserInfoWidget
                    has_map={designer.has_map}
                    mobile={designer.mobile}
                    phone={designer.phone}
                    slug={designer.slug}
                    whatsapp={designer.whatsapp}
                    twitter={designer.twitter}
                    facebook={designer.facebook}
                    instagram={designer.instagram}
                    android={designer.android}
                    youtube={designer.youtube}
                    website={designer.website}
                    description={designer.description}
                    service={designer.service}
                    address={designer.address}
                    images={designer.images}
                    latitude={designer.latitude}
                    longitude={designer.longitude}
                    thumb={designer.thumb}
                  />
                ),
                videos: () => (
                  <VideosVerticalWidget videos={designer.videoGroup} />
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
            id={designer.id}
          />
        </View>
      </HeaderImageScrollView>
    </BgContainer>
  );
};

DesignerShowScreen.navigationOptions = ({navigation}) => ({
  // headerTransparent: navigation.state.params.headerBg,
  // headerStyle: {
  //   backgroundColor: navigation.state.params.headerBgColor
  // }
});

export default DesignerShowScreen;

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
