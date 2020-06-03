import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react';
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
  height,
  text,
  TheHold,
  width,
} from '../../../constants/sizes';
import {Button, Icon, Input} from 'react-native-elements';
import {filter, uniqBy} from 'lodash';
import validate from 'validate.js';
import {getSearchClassifieds} from '../../../redux/actions/classified';
import ClassifiedWidget from './ClassifiedWidget';
import widgetStyles from '../widgetStyles';
import SearchSort from '../search/SearchSort';
import {orderBy} from 'lodash';
import ClassifiedsMapView from '../map/ClassifiedsMapView';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import NoMoreElements from '../NoMoreElements';
import {HOMEKEY} from './../../../../app';
import SortByModal from '../search/SortByModal';

const ClassifiedList = ({
  classifieds,
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  showRefresh = true,
  showClassifiedsFilter = true,
  showSortSearch = true,
  title,
  searchElements,
}) => {
  const [items, setItems] = useState([]);
  const [elementsWithMap, setElementsWithMap] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentShowMore, setCurrentShowMore] = useState(showMore);
  const [params, setParams] = useState(searchElements);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortModal, setSortModal] = useState(false);
  const [mapModal, setMapModal] = useState(false);
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);

  const loadMore = useCallback(() => {
    if (currentShowMore) {
      setPage(page + 1);
    }
  });

  useMemo(() => {
    switch (sort) {
      case 1:
        setItems(orderBy(items, ['name'], ['asc']));
        break;
      case 2:
        setItems(orderBy(items, ['name'], ['desc']));
        break;
      case 3:
        setItems(orderBy(items, ['price'], ['desc']));
        break;
      case 4:
        setItems(orderBy(items, ['price'], ['asc']));
        break;
      case 5:
        setItems(orderBy(items, ['id'], ['desc']));
        break;
      case 6:
        setItems(orderBy(items, ['id'], ['asc']));
        break;
      default:
        items;
    }
    setSortModal(false);
  }, [sort]);

  useMemo(() => {
    if (currentShowMore && page > 1 && page <= 20) {
      setIsLoading(true);
      setIsLoading(false);
      setRefresh(false);
      return axiosInstance(`search/classified?page=${page}`, {
        params,
      })
        .then((r) => {
          setIsLoading(false);
          setRefresh(false);
          const classifiedGroup = uniqBy(items.concat(r.data), 'id');
          setItems(classifiedGroup);
        })
        .catch((e) => {
          setIsLoading(false);
          setRefresh(false);
        });
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    if (currentShowMore) {
      setRefresh(false);
      setIsLoading(false);
      return dispatch(
        getSearchClassifieds({searchParams: params, redirect: false}),
      );
    }
  }, [refresh]);

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      let filtered = filter(items, (i) => (i.name.includes(search) ? i : null));
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
    } else {
      setItems(classifieds);
    }
  }, [search]);

  useEffect(() => {
    setItems(classifieds);
    setElementsWithMap(filter(classifieds, (e, i) => (e.has_map ? e : null)));
  }, [classifieds]);

  return (
    <KeyboardAvoidingView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
      }}
      behavior="padding"
      enabled>
      {!validate.isEmpty(classifieds) ? (
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
          data={uniqBy(items, 'id')}
          refreshing={refresh}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => (showRefresh ? handleRefresh() : null)}
            />
          }
          onEndReached={() => loadMore()}
          contentContainerStyle={{
            marginBottom: 15,
            justifyContent: 'flex-start',
            minHeight: height,
            minWidth: '100%',
            flexGrow: 1,
            alignSelf: 'center',
          }}
          // disableVirtualization={false}
          ListHeaderComponentStyle={{
            backgroundColor: 'white',
          }}
          ListHeaderComponent={
            <View
              style={{
                marginTop: 5,
                marginBottom: 5,
                alignSelf: 'center',
                width: '100%',
              }}>
              {showSearch ? (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    // width: '100%',
                    // backgroundColor: 'white',
                  }}>
                  {showSortSearch ? (
                    <SearchSort
                      sort={sort}
                      sortModal={sortModal}
                      setSortModal={setSortModal}
                      setSort={setSort}
                      showClassifiedsFilter={showClassifiedsFilter}
                    />
                  ) : null}
                  {!validate.isEmpty(elementsWithMap) && HOMEKEY ? (
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
              <NoMoreElements
                title={I18n.t('no_more_classifieds')}
                isLoading={refresh}
              />
            ) : null
          }
          ListFooterComponentStyle={{
            marginBottom: bottomContentInset,
          }}
          renderItem={({item}) => (
            <ClassifiedWidget element={item} showName={showName} />
          )}
        />
      ) : (
        <View
          style={{
            minHeight: '100%',
            width: width - 50,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Button
            raised
            title={I18n.t('no_classifieds')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
      <SortByModal
        setSortModal={setSortModal}
        sortModal={sortModal}
        setSort={setSort}
      />
    </KeyboardAvoidingView>
  );
};

export default ClassifiedList;

ClassifiedList.propTypes = {
  classifieds: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({});
