import React, {useState, useMemo, useCallback, useContext} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {getSearchDesigners} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button, Input, Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../I18n';
import {
  bottomContentInset,
  iconSizes,
  text,
  width,
} from './../../constants/sizes';
import {filter, orderBy} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import UserWidgetHorizontal from '../widgets/user/UserWidgetHorizontal';
import TopSearchInput from '../widgets/TopSearchInput';
import UserWidgetVertical from '../widgets/user/UserWidgetVertical';
import ElementWidgetVertical from './ElementWidgetVertical';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import SearchSort from '../widgets/search/SearchSort';
import {useDispatch} from 'react-redux';

const UsersVerticalList = ({
  elements,
  searchParams,
  showMore,
  showSearch = false,
  showFooter = false,
  showTitle = false,
  showSortSearch = false,
  title,
  type,
  iconSize = iconSizes.small,
  textSize = text.small,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentShowMore, setCurrentShowMore] = useState(showMore);
  const [items, setItems] = useState(elements);
  const [params, setParams] = useState(searchParams);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortModal, setSortModal] = useState(false);
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const loadMore = useCallback(() => {
    setShowMore(true);
    setPage(page + 1);
  });

  useMemo(() => {
    if (showMore) {
      setIsLoading(true);
      setIsLoading(false);
      setRefresh(false);
      setShowMore(false);
      return axiosInstance(`user?page=${page}`, {
        params,
      })
        .then((r) => {
          const userGroup = uniqBy(items.concat(r.data), 'id');
          setItems(userGroup);
          setElements(userGroup);
        })
        .catch((e) => e);
    }
  }, [page]);

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

  const handleRefresh = useCallback(() => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchDesigners({searchParams: params}));
    }
  }, [refresh]);

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      setShowMore(false);
      let filtered = filter(elements, (i) =>
        i.slug.includes(search) ? i : null,
      );
      if (filtered.length > 0 || search.length > 0) {
        setItems(filtered);
      } else {
        setItems([]);
      }
    } else {
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
          contentInset={{bottom: bottomContentInset}}
          style={{paddingBottom: bottomContentInset}}
          numColumns={1}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={1}
          refreshing={refresh}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => handleRefresh()}
            />
          }
          contentContainerStyle={{
            width: width - 30,
          }}
          // columnWrapperStyle={{
          //   justifyContent: 'space-between',
          //   alignItems: 'center',
          // }}
          renderItem={({item}) => (
            <ElementWidgetVertical
              element={item}
              title={item.slug ? item.slug : item.name}
              showName={true}
              showSearch={false}
              thumb={item.thumb}
              iconSize={iconSize}
              textSize={textSize}
              type={type}
            />
          )}
          ListFooterComponent={
            showFooter ? (
              <View style={{width: '100%', minHeight: 100}}>
                <Button
                  loading={isLoading}
                  raised
                  title={I18n.t('no_more_designers')}
                  type="outline"
                  titleStyle={{fontFamily: text.font}}
                />
              </View>
            ) : null
          }
          ListFooterComponentStyle={{
            marginBottom: bottomContentInset,
          }}
          ListHeaderComponentStyle={{
            backgroundColor: 'white',
          }}
          ListHeaderComponent={
            <View style={{paddingTop: 5, paddingBottom: 5}}>
              {showSearch ? <TopSearchInput setSearch={setSearch} /> : null}
              {showSortSearch ? (
                <SearchSort
                  sort={sort}
                  sortModal={sortModal}
                  setSortModal={setSortModal}
                  setSort={setSort}
                />
              ) : null}
              {showTitle ? (
                <Text
                  style={{
                    fontFamily: text.font,
                    fontSize: text.large,
                    textAlign: 'left',
                    color: colors.header_one_theme_color,
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.18,
                    shadowRadius: 1.0,
                    elevation: 1,
                  }}>
                  {title}
                </Text>
              ) : null}
            </View>
          }
        />
      ) : null}
    </KeyboardAvoidingView>
  );
};

export default UsersVerticalList;

UsersVerticalList.propTypes = {
  elements: PropTypes.array.isRequired,
  category: PropTypes.object,
  searchParams: PropTypes.object,
};
