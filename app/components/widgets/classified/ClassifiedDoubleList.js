import React, {useState, useMemo, useCallback, useContext} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import I18n, {isRTL} from './../../../I18n';
import {
  bottomContentInset,
  text,
  TheHold,
  width,
} from '../../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import {filter, uniqBy} from 'lodash';
import validate from 'validate.js';
import {getSearchClassifieds} from '../../../redux/actions/classified';
import widgetStyles from '../widgetStyles';
import SearchSort from '../search/SearchSort';
import {orderBy} from 'lodash';
import ClassifiedsMapView from '../map/ClassifiedsMapView';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import ClassifiedWidgetHorizontal from './ClassifiedWidgetHorizontal';
import {useDispatch, useSelector} from 'react-redux';

const ClassifiedDoubleList = ({
  classifieds,
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  showRefresh = true,
  title,
  searchElements,
}) => {
  [items, setItems] = useState(classifieds);
  [elements, setElements] = useState(classifieds);
  [elementsWithMap, setElementsWithMap] = useState(
    filter(elements, (e, i) => (e.has_map ? e : null)),
  );
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [showMore, setShowMore] = useState(showMore);
  [items, setItems] = useState(elements);
  [params, setParams] = useState(searchElements);
  [page, setPage] = useState(1);
  [search, setSearch] = useState('');
  [sort, setSort] = useState('');
  [sortModal, setSortModal] = useState(false);
  [mapModal, setMapModal] = useState(false);
  const dispatch = useDispatch();
  const {colors} = useSelector(state => state.settings);

  const loadMore = useCallback(() => {
    setShowMore(true);
    setPage(page + 1);
  });

  useMemo(() => {
    switch (sort) {
      case 1:
        setItems(orderBy(items, ['id'], ['asc']));
        break;
      case 2:
        setItems(orderBy(items, ['id'], ['desc']));
        break;
      case 3:
        setItems(orderBy(items, ['price'], ['asc']));
        break;
      case 4:
        setItems(orderBy(items, ['price'], ['desc']));
        break;
      case 5:
        setItems(orderBy(items, ['name'], ['desc']));
        break;
      default:
        items;
    }
    setSortModal(false);
  }, [sort]);
  useMemo(() => {
    if (showMore && page > 1 && page <= 20) {
      setIsLoading(true);
      setIsLoading(false);
      setRefresh(false);
      setShowMore(false);
      return axiosInstance(`search/classified?page=${page}`, {
        params,
      })
        .then(r => {
          setIsLoading(false);
          setRefresh(false);
          const classifiedGroup = uniqBy(items.concat(r.data), 'id');
          setItems(classifiedGroup);
          setElements(classifiedGroup);
        })
        .catch(e => {
          setIsLoading(false);
          setRefresh(false);
        });
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchClassifieds({searchParams: params, redirect: false}));
    }
  }, [refresh]);

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      let filtered = filter(elements, i =>
        i.name.includes(search) ? i : null,
      );
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
    } else {
      setShowMore(true);
      setItems(elements);
    }
  }, [search]);

  return (
    <KeyboardAvoidingView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
      }}
      behavior="padding"
      enabled>
      {!validate.isEmpty(elements) ? (
        <FlatList
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="none"
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={TheHold}
          contentInset={{bottom: bottomContentInset}}
          style={{paddingBottom: bottomContentInset}}
          numColumns={2}
          data={items}
          refreshing={refresh}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => (showRefresh ? handleRefresh() : null)}
            />
          }
          onEndReached={() => loadMore()}
          contentContainerStyle={{
            minHeight: '100%',
            width,
            marginBottom: 15,
            justifyContent: 'flex-start',
          }}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          ListHeaderComponentStyle={{
            // width: '100%',
            // padding: 10,
            backgroundColor: 'white',
          }}
          ListHeaderComponent={
            <View style={{padding: 5, backgroundColor: 'white'}}>
              {showSearch ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    backgroundColor: 'white',
                  }}>
                  <SearchSort
                    sort={sort}
                    sortModal={sortModal}
                    setSortModal={setSortModal}
                    setSort={setSort}
                  />
                  {!validate.isEmpty(elementsWithMap) ? (
                    <ClassifiedsMapView
                      mapModal={mapModal}
                      setMapModal={setMapModal}
                      elements={elementsWithMap}
                    />
                  ) : null}
                </View>
              ) : null}
              {showTitle ? (
                <TouchableOpacity
                  style={widgetStyles.titleContainer}
                  onPress={() => navigate('CategoryIndex')}>
                  <View style={widgetStyles.titleWrapper}>
                    <Text
                      style={[
                        widgetStyles.title,
                        {color: colors.header_one_theme_color},
                      ]}>
                      {I18n.t(title)}
                    </Text>
                  </View>
                  <Icon
                    type="entypo"
                    name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                    size={20}
                    color={colors.header_one_theme_color}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          }
          ListFooterComponent={() =>
            showFooter ? (
              <View>
                <Button
                  loading={isLoading}
                  raised
                  title={I18n.t('no_more_classifieds')}
                  type="outline"
                  titleStyle={{fontFamily: text.font}}
                />
              </View>
            ) : null
          }
          renderItem={({item}) => (
            <ClassifiedWidgetHorizontal
              widthVal={width / 2 - 10}
              heightVal={280}
              element={item}
              key={item.id}
            />
          )}
        />
      ) : (
        <View style={{marginTop: '20%', width: width - 50}}>
          <Button
            raised
            title={I18n.t('no_classifieds')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ClassifiedDoubleList;

ClassifiedDoubleList.propTypes = {
  classifieds: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({});
