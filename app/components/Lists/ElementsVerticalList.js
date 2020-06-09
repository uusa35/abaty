import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Text,
} from 'react-native';
import {
  getCompany,
  getDesigner,
  getSearchCompanies,
  getSearchDesigners,
  reAuthenticate,
} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button, Input, Icon} from 'react-native-elements';
import I18n from './../../I18n';
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
import {getSearchProducts} from '../../redux/actions/product';
import {useNavigation} from 'react-navigation-hooks';
import NoMoreElements from '../widgets/NoMoreElements';

const ElementsVerticalList = ({
  elements,
  searchParams,
  showMore = false,
  showSearch = false,
  showFooter = false,
  showTitle = false,
  showSortSearch = false,
  title,
  type,
  iconSize = iconSizes.small,
  textSize = text.small,
  columns = 1,
  noElementsTitle = I18n.t('not_available'),
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [items, setItems] = useState(elements);
  const [params, setParams] = useState(searchParams);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortModal, setSortModal] = useState(false);
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const navigation = useNavigation();

  const loadMore = (d) => {
    if (__DEV__) {
      console.log('distance from ', d);
    }
    if (showMore) {
      setPage(page + 1);
    }
  };

  useMemo(() => {
    if (showMore && page > 1 && page <= 20) {
      switch (type) {
        case 'product':
          axiosInstance(`search/product?page=${page}`, {
            params,
          })
            .then((r) => {
              if (!validate.isEmpty(r.data)) {
                const productsGroup = uniqBy(items.concat(r.data), 'id');
                setItems(productsGroup);
                setIsLoading(false);
                setRefresh(false);
              }
            })
            .catch((e) => e);
          break;
        case 'designer':
          axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then((r) => {
              const userGroup = uniqBy(items.concat(r.data), 'id');
              setItems(userGroup);
            })
            .catch((e) => {
              if (__DEV__) {
                console.log('the e ElementsVerticalList', e);
              }
            });
          break;
        case 'company':
          axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then((r) => {
              const userGroup = uniqBy(items.concat(r.data), 'id');
              setItems(userGroup);
            })
            .catch((e) => {
              if (__DEV__) {
                console.log('the e ElementsVerticalList', e);
              }
            });
          break;
        default:
          null;
      }
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

  const handleRefresh = () => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      switch (type) {
        case 'designer':
          dispatch(getSearchDesigners({searchParams: params}));
          break;
        case 'product':
          dispatch(getSearchProducts({searchParams: params, redirect: false}));
        case 'company':
          dispatch(getSearchCompanies({searchParams: params}));
        case 'favoriteCompanies':
          dispatch(reAuthenticate());
          break;
        default:
          null;
      }
    }
  };

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
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

  useEffect(() => {
    setItems(elements);
  }, [elements]);

  const handleClick = useCallback((type, searchParams, element) => {
    console.log('clicked', type);
    switch (type) {
      case 'designer':
        dispatch(
          getDesigner({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'category':
        dispatch(
          getSearchProducts({
            name: element.name,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'company':
        dispatch(
          getCompany({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'favoriteCompanies':
        dispatch(
          getCompany({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      default:
        null;
    }
  });

  return (
    <KeyboardAvoidingView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
        flex: 1,
      }}
      behavior="padding"
      enabled>
      <FlatList
        ListEmptyComponent={() => <NoMoreElements title={noElementsTitle} />}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        scrollEnabled={showMore}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: showFooter ? bottomContentInset : 10}}
        numColumns={columns}
        data={items}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={({distanceFromEnd}) => loadMore(distanceFromEnd)}
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
            handleClick={handleClick}
          />
        )}
        ListFooterComponent={
          showFooter ? (
            <View
              style={{
                width: '100%',
                minHeight: 100,
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
              }}>
              <Button
                loading={isLoading}
                raised
                onPress={() => dispatch(navigation.navigate('Home'))}
                containerStyle={{width: '100%'}}
                title={I18n.t(`no_more_${type}`)}
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
    </KeyboardAvoidingView>
  );
};

export default ElementsVerticalList;

ElementsVerticalList.propTypes = {
  elements: PropTypes.array.isRequired,
  category: PropTypes.object,
  searchParams: PropTypes.object,
};
