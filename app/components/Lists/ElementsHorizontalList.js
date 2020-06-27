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
  ActivityIndicator,
} from 'react-native';
import {
  getCompany,
  getDesigner,
  getSearchCompanies,
  getSearchDesigners,
} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button, Input, Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../I18n';
import {
  bottomContentInset,
  iconSizes,
  text,
  TheHold,
  width,
} from './../../constants/sizes';
import {filter, orderBy, uniqBy} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import UserWidgetHorizontal from '../widgets/user/UserWidgetHorizontal';
import TopSearchInput from '../widgets/TopSearchInput';
import UserWidgetVertical from '../widgets/user/UserWidgetVertical';
import ElementWidgetVertical from './ElementWidgetVertical';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import SearchSort from '../widgets/search/SearchSort';
import {useDispatch, useSelector} from 'react-redux';
import {getProduct, getSearchProducts} from '../../redux/actions/product';
import {useNavigation} from 'react-navigation-hooks';
import ElementWidgetHorizontal from './ElementWidgetHorizontal';
import SortByModal from '../widgets/search/SortByModal';
import EmptyListWidget from './EmptyListWidget';
import ProductWidget from '../widgets/product/ProductWidget';
import ServiceWidget from '../widgets/service/ServiceWidget';
import {getService} from '../../redux/actions/service';
import NoMoreElements from '../widgets/NoMoreElements';

const ElementsHorizontalList = ({
  elements,
  searchParams,
  showName = true,
  showMore = false,
  showSearch = false,
  showFooter = false,
  showTitle = false,
  showSortSearch = false,
  showProductsFilter = false,
  showTitleIcons = false,
  showRefresh = false,
  title,
  type,
  iconSize = iconSizes.small,
  textSize = text.small,
  columns = 1,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [items, setItems] = useState(elements);
  const [params, setParams] = useState(searchParams);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortModal, setSortModal] = useState(false);
  const {token} = useSelector((state) => state);
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const navigation = useNavigation();

  const loadMore = (d) => {
    if (showMore && page <= 15) {
      setPage(page + 1);
      setIsLoading(showMore);
    }
  };

  useMemo(() => {
    if (showMore && page > 1 && page <= 15) {
      switch (type) {
        case 'product':
          return axiosInstance(`search/product?page=${page}`, {
            params,
          })
            .then((r) => {
              const elementsGroup = uniqBy(items.concat(r.data), 'id');
              setItems(elementsGroup);
            })
            .catch((e) => e);
          break;
        case 'designer':
          return axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then((r) => {
              const elementsGroup = uniqBy(items.concat(r.data), 'id');
              setItems(elementsGroup);
            })
            .catch((e) => {
              if (__DEV__) {
                console.log('the e ElementsHorizontalList', e);
              }
            });
          break;
        case 'company':
          return axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then((r) => {
              const elementsGroup = uniqBy(items.concat(r.data), 'id');
              setItems(elementsGroup);
            })
            .catch((e) => {
              if (__DEV__) {
                console.log('the e ElementsHorizontalList', e);
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
          break;
        case 'company':
          dispatch(getSearchCompanies({searchParams: params}));
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
      let filtered = filter(items, (i) => (i.name.includes(search) ? i : null));
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
    } else {
      setItems(elements);
    }
  }, [search]);

  useEffect(() => {
    setItems(elements);
  }, [elements]);

  useMemo(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  const handleClick = (element) => {
    switch (type) {
      case 'designer':
        return dispatch(
          getDesigner({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'category':
        return dispatch(
          getSearchProducts({
            name: element.name,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'company':
        return dispatch(
          getCompany({
            id: element.id,
            searchParams,
            redirect: true,
          }),
        );
        break;
      case 'product':
        return dispatch(
          getProduct({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      case 'service':
        return dispatch(
          getService({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      default:
        null;
    }
  };

  const renderItem = (item) => {
    switch (type) {
      case 'product':
        return (
          <ProductWidget
            element={item}
            showName={showName}
            key={item.id}
            handleClickProductWidget={handleClick}
          />
        );
        break;
      case 'service':
        return (
          <ServiceWidget
            element={item}
            showName={showName}
            handleClick={handleClick}
          />
        );
        break;
      default:
        return (
          <ElementWidgetHorizontal
            element={item}
            title={item.slug ? item.slug : item.name}
            showName={showName}
            showSearch={false}
            thumb={item.thumb}
            iconSize={iconSize}
            textSize={textSize}
            type={type}
            handleClick={handleClick}
          />
        );
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <FlatList
        ListEmptyComponent={<EmptyListWidget title={I18n.t('no_products')} />}
        scrollEnabled={showFooter}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}
        numColumns={columns}
        data={uniqBy(items, 'id')}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={({distanceFromEnd}) => loadMore(distanceFromEnd)}
        onEndReachedThreshold={TheHold}
        refreshing={refresh}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => (showRefresh ? handleRefresh() : null)}
          />
        }
        columnWrapperStyle={{
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignSelf: 'center',
        }}
        ListHeaderComponentStyle={{
          backgroundColor: 'white',
        }}
        renderItem={({item}) => renderItem(item)}
        ListFooterComponent={() =>
          showFooter || !validate.isEmpty(items) || !isLoading ? (
            <NoMoreElements
              title={I18n.t('no_more_products')}
              isLoading={isLoading}
            />
          ) : (
            <ActivityIndicator size={iconSizes.larger} />
          )
        }
        ListFooterComponentStyle={{
          marginBottom: bottomContentInset,
        }}
        ListHeaderComponentStyle={{
          backgroundColor: 'white',
        }}
        ListHeaderComponent={
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              backgroundColor: 'transparent',
              marginTop: showSearch ? '3%' : 0,
            }}>
            {showSearch && (
              <TopSearchInput search={search} setSearch={setSearch} />
            )}
            {showSortSearch && (
              <SearchSort
                sort={sort}
                sortModal={sortModal}
                setSortModal={setSortModal}
                setSort={setSort}
                showProductsFilter={showProductsFilter}
              />
            )}
            {showTitle && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  padding: 5,
                  paddingRight: 25,
                }}>
                <Text
                  style={[
                    styles.mainTitle,
                    {color: colors.header_one_theme_color},
                  ]}>
                  {title ? title : I18n.t('products')}
                </Text>
                {showTitleIcons && (
                  <Icon
                    type="entypo"
                    name="select-arrows"
                    size={iconSizes.smaller}
                    onPress={() => setSortModal(true)}
                  />
                )}
              </View>
            )}
          </View>
        }
      />
      <SortByModal
        setSortModal={setSortModal}
        sortModal={sortModal}
        setSort={setSort}
      />
    </KeyboardAvoidingView>
  );
};

export default ElementsHorizontalList;

ElementsHorizontalList.propTypes = {
  elements: PropTypes.array.isRequired,
  category: PropTypes.object,
  searchParams: PropTypes.object,
};
