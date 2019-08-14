import React, {useContext, useState, useMemo} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {connect} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView
} from 'react-native-image-header-scroll-view';
import {text, width} from '../constants';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import UserInfoWidget from '../components/widgets/user/UserInfoWidget';
import UserImageProfile from '../components/widgets/user/UserImageProfile';
import PropTypes from 'prop-types';
import VideosWidget from '../components/widgets/VideosWidget';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import I18n from './../I18n';
import ProductList from '../components/widgets/product/ProductList';
import UserCategoriesInfoWidget from '../components/widgets/user/UserCategoriesInforWidget';
import MainSliderWidget from '../components/widgets/MainSliderWidget';
import {getDesigner} from '../redux/actions';
import {
  commentModalSelector,
  designerSelector
} from '../redux/selectors/collection';
import {
  commentsSelector,
  searchParamsSelector
} from '../redux/selectors/collections';
import {GlobalValuesContext} from '../redux/GlobalValuesContext';
import CommentScreenModal from './CommentScreenModal';
import {DispatchContext} from '../redux/DispatchContext';

const DesignerShowScreen = ({user, searchParams, commentModal, comments}) => {
  const {colors, guest, logo} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);
  const collectedCatetories = !validate.isEmpty(user.products)
    ? user.productCategories.concat(user.productGroupCategories)
    : user.productGroupCategories.concat(user.productCategories);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'products', title: I18n.t('products')},
    {key: 'categories', title: I18n.t('categories')},
    {key: 'info', title: I18n.t('information').substring(0, 10)},
    {key: 'videos', title: I18n.t('videos')}
  ]);
  const [refresh, setRefresh] = useState(false);
  const [categories, setCategories] = useState(collectedCatetories);

  useMemo(() => {
    if (refresh) {
      setRefresh(false);
      return dispatch(
        getDesigner({
          id: user.id,
          searchElements: {user_id: user.id}
        })
      );
    }
  }, [refresh]);

  useMemo(() => {
    return false;
  }, [index]);

  useMemo(() => {
    return false;
  }, [categories]);

  return (
    <HeaderImageScrollView
      horizontal={false}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      maxHeight={150}
      minHeight={50}
      containerStyle={{flex: 1}}
      headerImage={{
        uri: user.banner ? user.banner : logo
      }}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => {
            setRefresh(true);
          }}
        />
      }>
      <View style={styles.wrapper}>
        <TriggeringView onHide={() => console.log('text hidden')}>
          <UserImageProfile
            member_id={user.id}
            showFans={true}
            showRating={true}
            guest={guest}
            isFanned={user.isFanned}
            totalFans={user.totalFans}
            currentRating={user.rating}
            medium={user.medium}
            logo={logo}
            slug={user.slug}
            type={user.role.slug}
            views={user.views}
            showComments={!guest}
            commentsCount={user.commentsCount}
          />
          {!validate.isEmpty(user.slides) ? (
            <View style={{paddingTop: 10, paddingBottom: 10, width: width}}>
              <MainSliderWidget slides={user.slides} />
            </View>
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
                  backgroundColor: colors.btn_bg_theme_color
                }}
                activeColor={colors.header_one_theme_color}
                inactiveColor={colors.header_tow_theme_color}
                style={{backgroundColor: 'white'}}
                labelStyle={{
                  fontFamily: text.font,
                  fontSize: text.small
                }}
              />
            )}
            navigationState={{
              index,
              routes
            }}
            renderScene={SceneMap({
              products: () => (
                <ProductList
                  products={user.productGroup.concat(user.products)}
                  showSearch={false}
                  showTitle={true}
                  showFooter={false}
                  showMore={false}
                  searchElements={{}}
                />
              ),
              categories: () => (
                <UserCategoriesInfoWidget elements={categories} />
              ),
              info: () => (
                <UserInfoWidget
                  mobile={user.mobile}
                  phone={user.phone}
                  slug={user.slug}
                  whatsapp={user.whatsapp}
                  twitter={user.twitter}
                  facebook={user.facebook}
                  instagram={user.instagram}
                  android={user.android}
                  youtube={user.youtube}
                  website={user.website}
                  description={user.description}
                  service={user.service}
                  address={user.address}
                  images={user.images}
                  latitude={user.latitude}
                  longitude={user.longitude}
                  thumb={user.thumb}
                />
              ),
              videos: () => <VideosWidget videos={user.videoGroup} />
            })}
            style={{marginTop: 10, backgroundColor: 'white'}}
            onIndexChange={index => setIndex(index)}
            initialLayout={{width: width}}
          />
        </TriggeringView>
        <CommentScreenModal
          commentModal={commentModal}
          elements={comments}
          model="user"
          id={user.id}
        />
      </View>
    </HeaderImageScrollView>
  );
};

function mapStateToProps(state) {
  return {
    user: designerSelector(state),
    comments: commentsSelector(state),
    commentModal: commentModalSelector(state),
    searchParams: searchParamsSelector(state)
  };
}

export default connect(mapStateToProps)(DesignerShowScreen);

DesignerShowScreen.propTypes = {
  user: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
  commentModal: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large
  },
  subTitle: {
    fontFamily: text.font,
    fontSize: text.medium
  },
  description: {
    fontFamily: text.font,
    fontSize: text.medium,
    textAlign: 'left'
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10
  },
  wrapper: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: 'lightgrey'
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 5,
    marginLeft: 5
  },
  itemRow: {
    borderTopWidth: 0.5,
    borderColor: 'lightgrey',
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  scene: {
    flex: 1
  }
});
