import React, {useState, useMemo, useContext} from 'react';
import {Text, ImageBackground, TouchableOpacity} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import I18n from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {text, width} from '../../../constants';
import {useNavigation} from 'react-navigation-hooks';
import {SHOW_SEARCH_MODAL} from '../../../redux/actions/types';
import {DispatchContext} from '../../../redux/DispatchContext';
import { take , first, map, nth  } from 'lodash';
import {startClassifiedSearching} from "../../../redux/actions";

const HomeKeySearchTab = ({ elements }) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  const [index, setIndex] = useState(0);
  const parentCategories = map(take(elements,3), (e,i) => {
      return {
          key : e.id,
          title : e.name
      }
  });
  console.log('parentCategories', parentCategories[0]);
  // const [routes, setRoutes] = useState([
  //   {key: 'FirstRoute', title: I18n.t('sale')},
  //   {key: 'SecondRoute', title: I18n.t('buy')},
  //   {key: 'ThirdRoute', title: I18n.t('share')}
  // ]);
    const[routes,setRoutes] = useState(parentCategories);
  const SearchTab = ({ element }) => (
    <TouchableOpacity
      onPress={() => {
          console.log('element', element);
          // dispatch(startClassifiedSearching(element))
      }}
      style={{
        padding: 20,
        backgroundColor: 'white',
        opacity: 0.8,
        width: '90%',
        alignSelf: 'center'
      }}>
      <Text style={{fontFamily: text.font, textAlign: 'left'}}>
        {/*{I18n.t('search')} {element.title}*/}
      </Text>
    </TouchableOpacity>
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
          0: () => <SearchTab element={parentCategories[0]} />,
          1: () => <SearchTab element={parentCategories[1]} />,
          2: () => <SearchTab element={parentCategories[2]} />,
        })}
        style={{backgroundColor: 'transparent'}}
        onIndexChange={i => setIndex(i)}
        initialLayout={{width: width}}
      />
    </ImageBackground>
  );
};

export default HomeKeySearchTab;
