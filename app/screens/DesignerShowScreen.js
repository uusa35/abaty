import React, {Component} from 'react';
import {Text, StyleSheet, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import HeaderImageScrollView, {
  TriggeringView
} from 'react-native-image-header-scroll-view';
import MapViewWidget from '../components/widgets/MapViewWidget';
import {text, links, width} from '../constants';
import FastImage from 'react-native-fast-image';
import ImagesWidget from '../components/widgets/ImagesWidget';
import validate from 'validate.js';
import {NavContext} from './../redux/NavContext';
import {View} from 'react-native-animatable';
import UserInfoWidget from '../components/widgets/user/UserInfoWidget';
import UserImageProfile from '../components/widgets/user/UserImageProfile';
import PropTypes from 'prop-types';
import VideosWidget from '../components/widgets/VideosWidget';
import {
  TabView,
  SceneMap,
  TabBar,
  NavigationState,
  SceneRendererProps
} from 'react-native-tab-view';
import I18n from './../I18n';
import Video from 'react-native-video';
import UserShowInformationTabBarWidget from '../components/widgets/user/UserShowInfomrationWidgetTabBarWidget';
import ProductList from '../components/widgets/product/ProductList';
import UserCategoriesInfoWidget from '../components/widgets/user/UserCategoriesInforWidget';
import MainSliderWidget from '../components/widgets/MainSliderWidget';

class DesignerShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'products', title: I18n.t('products')},
        {key: 'categories', title: I18n.t('categories')},
        {key: 'info', title: I18n.t('information')},
        {key: 'more', title: I18n.t('videos')}
      ]
    };
  }

  render() {
    const {designer, navigation, settings} = this.props;
    console.log('the categories', designer.categories);
    return (
      <NavContext.Provider value={{navigation}}>
        <HeaderImageScrollView
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          maxHeight={150}
          minHeight={50}
          containerStyle={{flex: 1}}
          headerImage={{
            uri: designer.banner ? designer.banner : settings.logo
          }}>
          <View style={styles.wrapper}>
            <TriggeringView onHide={() => console.log('text hidden')}>
              <UserImageProfile
                large={designer.large}
                logo={settings.logo}
                slug={designer.slug}
              />
              {!validate.isEmpty(designer.slides) ? (
                <View style={{paddingTop: 10, paddingBottom: 10, width: width}}>
                  <MainSliderWidget slides={designer.slides} />
                </View>
              ) : null}
              <View style={{paddingRight: 10, paddingLeft: 10}}>
                <ImagesWidget
                  elements={designer.images}
                  name={designer.slug}
                  showLabels={false}
                />
                {/*<UserShowInformationTabBarWidget element={designer} />*/}
                <TabView
                  renderTabBar={props => (
                    <TabBar
                      {...props}
                      // tabStyle={{ backgroundColor: 'white'}}
                      // indicatorContainerStyle={{backgroundColor: 'white'}}
                      // contentContainerStyle={{backgroundColor: 'white'}}
                      indicatorStyle={{
                        backgroundColor: `${settings.colors.btn_bg_theme_color}`
                      }}
                      activeColor={settings.colors.header_one_theme_color}
                      inactiveColor={settings.colors.header_tow_theme_color}
                      style={{backgroundColor: 'white'}}
                      labelStyle={{
                        fontFamily: text.font,
                        fontSize: text.small
                      }}
                    />
                  )}
                  navigationState={this.state}
                  renderScene={SceneMap({
                    products: () => (
                      <ProductList
                        elements={designer.productGroup}
                        showSearch={false}
                        showTitle={true}
                        showFooter={false}
                      />
                    ),
                    categories: () => (
                      <UserCategoriesInfoWidget
                        elements={designer.categories}
                      />
                    ),
                    info: () => <UserInfoWidget user={designer} />,
                    more: () => <VideosWidget videos={designer.videos} />
                  })}
                  style={{marginTop: 10, backgroundColor: 'white'}}
                  onIndexChange={index => this.setState({index})}
                  initialLayout={{width: width}}
                />
              </View>
            </TriggeringView>
          </View>
        </HeaderImageScrollView>
      </NavContext.Provider>
    );
  }
}

function mapStateToProps(state) {
  return {
    designer: state.designer,
    settings: state.settings
  };
}

export default connect(mapStateToProps)(DesignerShowScreen);

DesignerShowScreen.propTypes = {
  settings: PropTypes.object.isRequired,
  designer: PropTypes.object.isRequired
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
