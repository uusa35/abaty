import React, {useState, useContext} from 'react';
import {StyleSheet} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {text, width} from '../../../constants/sizes';
import ProductList from '../product/ProductList';
import UserCategoriesInfoWidget from './UserCategoriesInforWidget';
import UserInfoWidget from './UserInfoWidget';
import VideosWidget from '../VideosWidget';
import validate from '../../../screens/DesignerShowScreen';
import I18n from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const UserTabViewWidget = ({user}) => {
  const {colors} = useContext(GlobalValuesContext);
  const collectedCatetories = !validate.isEmpty(user.products)
    ? user.productCategories.concat(user.productGroupCategories)
    : user.productGroupCategories.concat(user.productCategories);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'products', title: I18n.t('products')},
    {key: 'categories', title: I18n.t('categories')},
    {key: 'info', title: I18n.t('information').substring(0, 10)},
    {key: 'videos', title: I18n.t('videos')},
  ]);
  return (
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
            products={user.productGroup.concat(user.products)}
            showSearch={false}
            showTitle={true}
            showFooter={false}
            showMore={false}
            searchElements={{}}
          />
        ),
        categories: () => (
          <UserCategoriesInfoWidget elements={collectedCatetories} />
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
        videos: () => <VideosWidget videos={user.videoGroup} />,
      })}
      style={{marginTop: 10, backgroundColor: 'white'}}
      onIndexChange={(index) => setIndex(index)}
      initialLayout={{width: width}}
    />
  );
};

export default React.memo(UserTabViewWidget);

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
