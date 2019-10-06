import React, {useState, useMemo, useContext} from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
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
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        opacity: 0.8,
        width: '90%',
        alignSelf: 'center'
      }}>
      <Text style={{fontFamily: text.font, textAlign: 'left'}}>
        {I18n.t('search')}
      </Text>
    </View>
  );

  const SecondRoute = () => (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        opacity: 0.8,
        width: '90%',
        alignSelf: 'center'
      }}>
      <Text style={{fontFamily: text.font, textAlign: 'left'}}>
        {I18n.t('search')}
      </Text>
    </View>
  );

  const ThirdRoute = () => (
    <View
      style={{
        padding: 20,
        backgroundColor: 'white',
        opacity: 0.8,
        width: '90%',
        alignSelf: 'center'
      }}>
      <Text style={{fontFamily: text.font, textAlign: 'left'}}>
        {I18n.t('search')}
      </Text>
    </View>
  );
  return (
    <ImageBackground
      source={{
        uri:
          'https://the2d3dfloorplancompany.com/wp-content/uploads/2017/11/Real-Estate-Image-Enhancement-Sample.png'
      }}
      style={{width, alignSelf: 'center', height: 320}}
      resizeMode="cover">
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
            style={{
              backgroundColor: 'white',
              opacity: 0.8,
              width: '90%',
              alignSelf: 'center',
              marginTop: '25%'
            }}
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
        style={{backgroundColor: 'transparent'}}
        onIndexChange={i => setIndex(i)}
        initialLayout={{width: width}}
      />
    </ImageBackground>
  );
};

export default HomeKeySearchTab;
