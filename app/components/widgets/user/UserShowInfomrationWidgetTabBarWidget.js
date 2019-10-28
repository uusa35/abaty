import React, {useState, useMemo} from 'react';
import {TouchableOpacity, Animated, View, Text, StyleSheet} from 'react-native';
import {
  TabView,
  SceneMap,
  NavigationState,
  SceneRendererProps,
} from 'react-native-tab-view';
import UserInfoWidget from './UserInfoWidget';
import VideosWidget from '../VideosWidget';
import I18n from '../../../I18n';
import PropTypes from 'prop-types';

const UserShowInformationTabBarWidget = ({element}) => {
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState({
    routes: [
      {key: 'first', title: I18n.t('information')},
      {key: 'second', title: I18n.t('videos')},
    ],
  });

  function _renderTabBar(props) {
    const inputRange = routes.map((x, i) => i);

    return (
      <View style={styles.tabBar}>
        {routes.map((route, i) => {
          const color = Animated.color(
            Animated.round(
              Animated.interpolate(props.position, {
                inputRange,
                outputRange: inputRange.map(inputIndex =>
                  inputIndex === i ? 255 : 0,
                ),
              }),
            ),
            0,
            0,
          );

          return (
            <TouchableOpacity
              style={styles.tabItem}
              onPress={() => this.setState({index: i})}>
              <Animated.Text style={{color}}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }

  _renderScene =>
    SceneMap({
      first: <UserInfoWidget user={element} />,
      second: <VideosWidget videos={element.videos} />,
    });

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={this._renderScene}
      renderTabBar={this._renderTabBar}
      onIndexChange={i => setIndex(i)}
    />
  );
};

export default UserShowInformationTabBarWidget;

UserShowInformationTabBarWidget.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({});
