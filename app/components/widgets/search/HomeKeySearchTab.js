import React, {useState, useContext, useCallback} from 'react';
import {Text, ImageBackground, TouchableOpacity} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import I18n from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {text, width} from '../../../constants';
import {DispatchContext} from '../../../redux/DispatchContext';
import {take, first, map, filter} from 'lodash';
import {startClassifiedSearching} from '../../../redux/actions';

const HomeKeySearchTab = ({elements}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  const [index, setIndex] = useState(0);
  const parentCategories = map(take(elements, 3), (e, i) => {
    return {
      key: i,
      title: e.name.substring(0, 15),
      category: e
    };
  });
  const [routes, setRoutes] = useState(parentCategories);

  const SearchTab = ({element}) => {
    return (
      <TouchableOpacity
        onPress={() => dispatch(startClassifiedSearching(element.category))}
        style={{
          padding: 20,
          backgroundColor: 'white',
          opacity: 0.8,
          width: '90%',
          alignSelf: 'center'
        }}>
        <Text style={{fontFamily: text.font, textAlign: 'left'}}>
          {I18n.t('search')} {element.category.name.substring(0, 100)}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 0:
        return <SearchTab element={route} />;
      case 1:
        return <SearchTab element={route} />;
      case 2:
        return <SearchTab element={route} />;
    }
  };

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
        renderScene={renderScene}
        style={{backgroundColor: 'transparent'}}
        onIndexChange={i => setIndex(i)}
        initialLayout={{width: width}}
      />
    </ImageBackground>
  );
};

export default HomeKeySearchTab;
