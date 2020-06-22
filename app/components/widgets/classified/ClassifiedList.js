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
  TheHold,
  width,
} from '../../../constants/sizes';
import {Icon} from 'react-native-elements';
import {filter, uniqBy, isEmpty} from 'lodash';
import validate from 'validate.js';
import {getSearchClassifieds} from '../../../redux/actions/classified';
import ClassifiedWidget from './ClassifiedWidget';
import widgetStyles from '../widgetStyles';
import SearchSort from '../search/SearchSort';
import {orderBy} from 'lodash';
import ClassifiedsMapView from '../map/ClassifiedsMapView';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import NoMoreElements from '../NoMoreElements';
import {HOMEKEY} from './../../../../app';
import SortByModal from '../search/SortByModal';
import {useDispatch} from 'react-redux';
import EmptyListWidget from '../../Lists/EmptyListWidget';

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
  noMoreElementsTitle = null,
  noElementsTitle = null,
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
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const loadMore = () => {
    if (currentShowMore) {
      setPage(page + 1);
    }
  };

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
    if (showMore && page > 1 && page <= 20) {
      return axiosInstance(`search/classified?page=${page}`, {
        params,
      })
        .then((r) => {
          setIsLoading(false);
          setRefresh(false);
          const classifiedGroup = uniqBy(items.concat(r.data), 'id');
          setItems(classifiedGroup);
        })
        .catch((e) => e);
    }
  }, [page]);

  const handleRefresh = () => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchClassifieds({searchParams: params, redirect: false}));
    }
  };

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
      <FlatList
        ListEmptyComponent={<EmptyListWidget title={noElementsTitle} />}
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
          alignSelf: 'center',
          minHeight: height,
          minWidth: '100%',
          flexGrow: 1,
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
          showFooter &&
          !isEmpty(items) && (
            <NoMoreElements
              title={
                noMoreElementsTitle
                  ? noMoreElementsTitle
                  : I18n.t('no_more_classifieds')
              }
              isLoading={refresh}
            />
          )
        }
        ListFooterComponentStyle={{
          marginBottom: bottomContentInset,
        }}
        renderItem={({item}) => (
          <ClassifiedWidget element={item} showName={showName} />
        )}
      />
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
