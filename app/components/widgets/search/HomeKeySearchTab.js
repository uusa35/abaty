import React, {useState, useMemo, useContext} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import I18n from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {text, width} from '../../../constants';

const HomeKeySearchTab = () => {
  const {colors} = useContext(GlobalValuesContext);
  const [index, setIndex] = useState(0);
  const [routes, setRoutes] = useState([
    {key: 'FirstRoute', title: I18n.t('sale')},
    {key: 'SecondRoute', title: I18n.t('buy')},
    {key: 'ThirdRoute', title: I18n.t('share')}
  ]);
  const FirstRoute = () => (
    <View style={{padding: 20, backgroundColor: 'green', opacity: 0.7}}>
      <Text>sale</Text>
    </View>
  );

  const SecondRoute = () => (
    <View>
      <Text>buy</Text>
    </View>
  );

  const ThirdRoute = () => (
    <View>
      <Text>share</Text>
    </View>
  );
  return (
    <View
      style={{width: '90%', alignSelf: 'center', marginTop: 20, height: 300}}>
      <TabView
        lazy={true}
        renderTabBar={props => (
          <TabBar
            {...props}
            tabStyle={{backgroundColor: 'transparent'}}
            indicatorContainerStyle={{backgroundColor: 'transparent'}}
            contentContainerStyle={{backgroundColor: 'transparent'}}
            indicatorStyle={{
              backgroundColor: colors.btn_bg_theme_color
            }}
            activeColor={colors.header_one_theme_color}
            inactiveColor={colors.header_tow_theme_color}
            style={{backgroundColor: 'green'}}
            labelStyle={{
              fontFamily: text.font,
              fontSize: text.small,
              backgroundColor: 'transparent'
            }}
          />
        )}
        navigationState={{
          index,
          routes
        }}
        renderScene={SceneMap({
          FirstRoute: () => <FirstRoute />,
          SecondRoute: () => <SecondRoute />,
          ThirdRoute: () => <ThirdRoute />
        })}
        style={{marginTop: 10, backgroundColor: 'white'}}
        onIndexChange={i => setIndex(i)}
        initialLayout={{width: width}}
      />
    </View>
  );
};

export default HomeKeySearchTab;
