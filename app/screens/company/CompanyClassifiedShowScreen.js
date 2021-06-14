import React, {useState, useMemo, useContext} from 'react';
import {StyleSheet, RefreshControl} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView,
} from 'react-native-image-header-scroll-view';
import {text, width} from '../../constants/sizes';
import validate from 'validate.js';
import {View} from 'react-native-animatable';
import UserImageProfile from '../../components/widgets/user/UserImageProfile';
import PropTypes from 'prop-types';
import MainSliderWidget from '../../components/widgets/slider/MainSliderWidget';
import {getCompany} from '../../redux/actions/user';
import CommentScreenModal from './../CommentScreenModal';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import UserInfoWidget from '../../components/widgets/user/UserInfoWidget';
import I18n from '../../I18n';
import VideosVerticalWidget from '../../components/widgets/video/VideosVerticalWidget';
import {ABATI, ESCRAP, HOMEKEY, MALLR} from '../../../app';
import ClassifiedCategoryVerticalWidget from '../../components/widgets/category/ClassifiedCategoryVerticalWidget';
import ClassifiedDoubleList from '../../components/widgets/classified/ClassifiedDoubleList';
import {uniqBy, map} from 'lodash';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import ElementsHorizontalList from '../../components/Lists/ElementsHorizontalList';

const CompanyClassifiedShowScreen = () => {
  const {company, comments, commentModal, searchParams} = useSelector(
    state => state,
  );
  const {colors, guest, logo} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([]);
  const [headerBg, setHeaderBg] = useState(true);
  const [headerBgColor, setHeaderBgColor] = useState('transparent');
  const [collectedCategories, setCollectedCategories] = useState([]);

  useMemo(() => {
    const currentRoutes = [
      {key: 'info', title: I18n.t('information').substring(0, 10)},
    ];
    if (!validate.isEmpty(company.classifieds)) {
      currentRoutes.push({key: 'classifieds', title: I18n.t('classifieds')});
    }
    if (!validate.isEmpty(company.videoGroup.video_url_one)) {
      currentRoutes.push({key: 'videos', title: I18n.t('videos')});
    }
    setRoutes(currentRoutes);
  }, [company]);

  useMemo(() => {
    if (!validate.isEmpty(company.classifieds)) {
      const categories = uniqBy(
        map(company.classifieds, c => c.category),
        'id',
      );
      setCollectedCategories(categories);
    }
  }, [company]);

  useMemo(() => {
    navigation.setParams({headerBg, headerBgColor});
  }, [headerBg, headerBgColor]);

  const handleRefresh = () => {
    return dispatch(
      getCompany({
        id: company.id,
        searchParams: {user_id: company.id},
      }),
    );
  };

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
        uri: company.banner ? company.banner : logo,
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
            member_id={company.id}
            showFans={true}
            showRating={ABATI || MALLR || ESCRAP || HOMEKEY}
            showComments={ABATI || MALLR || ESCRAP || (HOMEKEY && !guest)}
            isFanned={company.isFanned}
            totalFans={company.totalFans}
            currentRating={company.rating}
            medium={company.medium}
            slug={company.slug}
            type={company.role.slug}
            views={company.views}
            commentsCount={company.commentsCount}
          />
          {!validate.isEmpty(company.slides) && (
            <View style={{paddingTop: 10, paddingBottom: 10, width: width}}>
              <MainSliderWidget slides={company.slides} />
            </View>
          )}
          {!validate.isEmpty(collectedCategories) && (
            <ClassifiedCategoryVerticalWidget
              user_id={company.id}
              elements={collectedCategories}
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
              classifieds: () => (
                <ElementsHorizontalList
                  type="classified"
                  elements={company.classifieds}
                  showSearch={false}
                  showTitle={false}
                  showFooter={false}
                  showMore={false}
                  columns={2}
                  searchElements={searchParams}
                />
              ),
              info: () => (
                <UserInfoWidget
                  has_map={company.has_map}
                  mobile={company.fullMobile}
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
            style={{marginTop: 10, backgroundColor: 'white'}}
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
    </HeaderImageScrollView>
  );
};

CompanyClassifiedShowScreen.navigationOptions = ({navigation}) => ({
  headerTransparent: navigation.state.params.headerBg,
  headerStyle: {
    backgroundColor: navigation.state.params.headerBgColor,
  },
});

export default CompanyClassifiedShowScreen;

CompanyClassifiedShowScreen.propTypes = {
  company: PropTypes.object.isRequired,
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
