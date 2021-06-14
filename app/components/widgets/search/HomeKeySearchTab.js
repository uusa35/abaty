import React, {useState, useContext, useMemo} from 'react';
import {Text, ImageBackground, TouchableOpacity, View} from 'react-native';
import {TabBar, TabView} from 'react-native-tab-view';
import I18n from '../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {text, touchOpacity, width} from '../../../constants/sizes';
import {take, map} from 'lodash';
import {startClassifiedSearching} from '../../../redux/actions/classified';
import ClassifiedSearchForm from './ClassifiedSearchForm';
import {showClassifiedFilter} from '../../../redux/actions';
import {useDispatch} from 'react-redux';

const HomeKeySearchTab = ({
  elements,
  main_bg,
  onlyTextForm = false,
  navigation,
}) => {
  const dispatch = useDispatch();
  const {colors, lang} = useContext(GlobalValuesContext);
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState('');
  const parentCategories = map(take(elements, 3), (e, i) => {
    if (e.isParent) {
      return {
        key: i,
        title: e.name.substring(0, 15),
        category: e,
      };
    }
  });
  const [routes, setRoutes] = useState(parentCategories);
  const {navigate} = navigation;

  useMemo(() => {
    const parentCategories = map(take(elements, 3), (e, i) => {
      if (e.isParent) {
        return {
          key: i,
          title: e.name.substring(0, 15),
          category: e,
        };
      }
    });
    setRoutes(parentCategories);
  }, [elements, lang]);

  const SearchTab = ({element}) => {
    return (
      <TouchableOpacity
        activeOpacity={touchOpacity}
        onPress={() => {
          dispatch(startClassifiedSearching(element.category));
          // dispatch(showClassifiedFilter());
          navigate('ClassifiedFilterModal');
        }}
        style={{
          padding: 20,
          backgroundColor: 'white',
          opacity: 0.8,
          width: '90%',
          alignSelf: 'center',
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
      source={{uri: main_bg}}
      style={{width, alignSelf: 'center', height: 270}}
      resizeMode="cover">
      {onlyTextForm ? (
        <View
          style={{
            backgroundColor: 'transparent',
            opacity: 1,
            width: '90%',
            alignSelf: 'center',
            marginTop: '35%',
          }}>
          <ClassifiedSearchForm search={search} setSearch={setSearch} />
        </View>
      ) : (
        <TabView
          lazy={true}
          renderTabBar={props => (
            <TabBar
              {...props}
              tabStyle={{backgroundColor: 'transparent'}}
              indicatorContainerStyle={{backgroundColor: 'transparent'}}
              contentContainerStyle={{backgroundColor: 'transparent'}}
              indicatorStyle={{
                backgroundColor: colors.btn_bg_theme_color,
              }}
              activeColor={colors.header_one_theme_color}
              inactiveColor={colors.header_tow_theme_color}
              style={{
                backgroundColor: 'white',
                opacity: 0.8,
                width: '90%',
                alignSelf: 'center',
                marginTop: '25%',
              }}
              labelStyle={{
                fontFamily: text.font,
                fontSize: text.small,
                backgroundColor: 'transparent',
              }}
            />
          )}
          navigationState={{
            index,
            routes,
          }}
          renderScene={renderScene}
          style={{backgroundColor: 'transparent'}}
          onIndexChange={i => setIndex(i)}
          initialLayout={{width: width}}
        />
      )}
    </ImageBackground>
  );
};

export default HomeKeySearchTab;
