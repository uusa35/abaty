import React, {Component} from 'react';
import {Text, StyleSheet} from 'react-native';
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
  NavigationState,
  SceneRendererProps
} from 'react-native-tab-view';
import I18n from './../I18n';
import Video from 'react-native-video';
import UserShowInformationTabBarWidget from '../components/widgets/user/UserShowInfomrationWidgetTabBarWidget';
import ProductList from '../components/widgets/product/ProductList';

class DesignerShowScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        {key: 'first', title: I18n.t('information')},
        {key: 'second', title: I18n.t('videos')}
      ]
    };
  }

  render() {
    const {designer, navigation, settings} = this.props;
    return (
      <NavContext.Provider value={{navigation}}>
        <HeaderImageScrollView
          maxHeight={150}
          minHeight={50}
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
              <ImagesWidget
                elements={designer.images}
                name={designer.slug}
                showLabels={false}
              />
              {/*<UserShowInformationTabBarWidget element={designer} />*/}
              <TabView
                navigationState={this.state}
                indicatorStyle={{backgroundColor: 'green', borderWidth: 10}}
                indicatorContainerStyle={{backgroundColor: 'pink'}}
                tabStyle={{color: 'green', backgroundColor: 'green'}}
                labelStyle={{
                  color: 'red',
                  backgroundColor: 'blue',
                  fontFamily: text.font,
                  fontSize: text.medium
                }}
                contentContainerStyle={{backgroundColor: 'pink'}}
                activeColor="green"
                style={{marginTop: 10, backgroundColor: 'white'}}
                renderScene={SceneMap({
                  first: () => <UserInfoWidget user={designer} />,
                  second: () => <VideosWidget videos={designer.videos} />
                })}
                onIndexChange={index => this.setState({index})}
                initialLayout={{width: width}}
              />
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
    paddingRight: 20,
    paddingLeft: 20,
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
