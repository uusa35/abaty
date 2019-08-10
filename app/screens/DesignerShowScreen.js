import React, {Component} from 'react';
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

class DesignerShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'products', title: I18n.t('products')},
        {key: 'categories', title: I18n.t('categories')},
        {key: 'info', title: I18n.t('information').substring(0, 10)},
        {key: 'videos', title: I18n.t('videos')}
      ],
      refresh: false
    };
  }

  render() {
    const {user, logo, colors, searchParams, guest, dispatch} = this.props;
    const categories = !validate.isEmpty(user.products)
      ? user.productCategories.concat(user.productGroupCategories)
      : user.productGroupCategories.concat(user.productCategories);
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
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: false});
              dispatch(
                getDesigner({
                  element: user,
                  searchElements: {user_id: user.id}
                })
              );
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
            />
            {!validate.isEmpty(user.slides) ? (
              <View style={{paddingTop: 10, paddingBottom: 10, width: width}}>
                <MainSliderWidget slides={user.slides} />
              </View>
            ) : null}
            <TabView
              lazy
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
                index: this.state.index,
                routes: this.state.routes
              }}
              renderScene={SceneMap({
                products: () => (
                  <ProductList
                    products={user.productGroup.concat(user.products)}
                    showSearch={false}
                    showTitle={true}
                    showFooter={false}
                    showMore={false}
                    searchElements={searchParams}
                  />
                ),
                categories: () => (
                  <UserCategoriesInfoWidget elements={categories} />
                ),
                info: () => <UserInfoWidget user={user} />,
                videos: () => <VideosWidget videos={user.videoGroup} />
              })}
              style={{marginTop: 10, backgroundColor: 'white'}}
              onIndexChange={index => this.setState({index})}
              initialLayout={{width: width}}
            />
          </TriggeringView>
        </View>
      </HeaderImageScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.designer,
    searchParams: state.searchParams,
    logo: state.settings.logo,
    colors: state.settings.colors,
    guest: state.guest
  };
}

export default connect(mapStateToProps)(DesignerShowScreen);

DesignerShowScreen.propTypes = {
  logo: PropTypes.string.isRequired,
  colors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  searchParams: PropTypes.object.isRequired,
  guest: PropTypes.bool.isRequired
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
