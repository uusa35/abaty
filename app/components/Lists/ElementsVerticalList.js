import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  Fragment,
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
import {Icon} from 'react-native-elements';
import I18n from './../../I18n';
import {
  bottomContentInset,
  iconSizes,
  text,
  TheHold,
  width,
  height,
} from './../../constants/sizes';
import {filter, orderBy, uniqBy} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import UserWidgetHorizontal from '../widgets/user/UserWidgetHorizontal';
import TopSearchInput from '../widgets/TopSearchInput';
import UserWidgetVertical from '../widgets/user/UserWidgetVertical';
import ElementWidgetVertical from './ElementWidgetVertical';
import {GlobalValuesContext} from '../../redux/GlobalValuesContext';
import SearchSort from '../widgets/search/SearchSort';
import {useDispatch} from 'react-redux';
import {getProduct, getSearchProducts} from '../../redux/actions/product';
import {useNavigation} from 'react-navigation-hooks';
import NoMoreElements from '../widgets/NoMoreElements';
import {getSearchServices, getService} from '../../redux/actions/service';
import {
  getClassified,
  getSearchClassifieds,
} from '../../redux/actions/classified';
import {setElementType} from '../../redux/actions';
import ProductWidget from '../widgets/product/ProductWidget';
import ServiceWidget from '../widgets/service/ServiceWidget';
import ClassifiedWidget from '../widgets/classified/ClassifiedWidget';
import CompanyHorizontalWidget from '../widgets/user/CompanyHorizontalWidget';
import ElementWidgetHorizontal from './ElementWidgetHorizontal';
import EmptyListWidget from './EmptyListWidget';
import {animations} from '../../constants/animations';
import {ABATI, HOMEKEY, EXPO} from '../../../app';
import ClassifiedsMapView from '../widgets/map/ClassifiedsMapView';
import SortByModal from '../widgets/search/SortByModal';

const ElementsVerticalList = ({
  elements,
  searchParams,
  showName = true,
  showMore = false,
  showSearch = false,
  showFooter = false,
  showTitle = false,
  showSortSearch = false,
  showProductsFilter = false,
  showClassifiedsFilter = false,
  emptyListImage = '',
  showTitleIcons = false,
  showRefresh = false,
  title,
  type,
  iconSize = iconSizes.small,
  textSize = text.small,
  columns = 1,
}) => {
  const [items, setItems] = useState(elements);
  const [elementsWithMap, setElementsWithMap] = useState([]);
  const [currentShowMore, setCurrentShowMore] = useState(showMore);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [params, setParams] = useState(searchParams);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortModal, setSortModal] = useState(false);
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const navigation = useNavigation();

  const loadMore = (d) => {
    if (currentShowMore && d >= 50) {
      setPage(page + 1);
      setIsLoading(showMore);
    }
  };

  useMemo(() => {
    if (showMore && page > 1 && page <= 20) {
      switch (type) {
        case 'product':
          return axiosInstance(`search/product?page=${page}`, {
            params,
          })
            .then((r) => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                setItems(elementsGroup);
                setCurrentShowMore(false);
              }
            })
            .catch((e) => setPage(1));
          break;
        case 'designer':
          return axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then((r) => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                setItems(elementsGroup);
                setCurrentShowMore(false);
              }
            })
            .catch((e) => {
              setPage(1);
            });
          break;
        case 'company':
          return axiosInstance(`search/user?page=${page}`, {
            params,
          })
            .then((r) => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                setItems(elementsGroup);
                setCurrentShowMore(false);
              }
            })
            .catch((e) => {
              setPage(1);
            });
          break;
        case 'classified':
          return axiosInstance(`search/classified?page=${page}`, {
            params,
          })
            .then((r) => {
              if (!validate.isEmpty(r.data)) {
                const elementsGroup = uniqBy(items.concat(r.data), 'id');
                setItems(elementsGroup);
                setCurrentShowMore(false);
              }
            })
            .catch((e) => {
              setPage(1);
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
        setItems(orderBy(items, ['finalPrice'], ['desc']));
        break;
      case 4:
        setItems(orderBy(items, ['finalPrice'], ['asc']));
        break;
      case 5:
        setItems(orderBy(items, ['id'], ['desc']));
        break;
      case 6:
        setItems(orderBy(items, ['id'], ['asc']));
        break;
      case 7:
        setItems(orderBy(items, ['price'], ['desc']));
        break;
      case 8:
        setItems(orderBy(items, ['price'], ['asc']));
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
        case 'service':
          dispatch(getSearchServices({searchParams: params}));
          break;
        case 'company':
          dispatch(getSearchCompanies({searchParams: params}));
          break;
        case 'classified':
          dispatch(
            getSearchClassifieds({searchParams: params, redirect: false}),
          );
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
      let filtered = filter(items, (i) =>
        i.name ? i.name.includes(search) : i.slug.includes(search) ? i : null,
      );
      filtered.length > 0 ? setItems(filtered) : setItems(elements);
    } else {
      setItems(elements);
    }
  }, [search]);

  useMemo(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [isLoading]);

  const renderFooter = () => {
    return showFooter && !validate.isEmpty(items) ? (
      <NoMoreElements
        title={I18n.t('no_more_', {item: I18n.t(type)})}
        isLoading={isLoading}
      />
    ) : (
      isLoading && <ActivityIndicator size={iconSizes.larger} />
    );
  };

  const renderHeader = () => {
    return (
      <Fragment>
        {!validate.isEmpty(items) && (
          <View
            style={{
              alignSelf: 'center',
              width: '100%',
              backgroundColor: 'transparent',
              margin: showSearch ? '2%' : 0,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              {showSortSearch && (
                <SearchSort
                  sort={sort}
                  sortModal={sortModal}
                  setSortModal={setSortModal}
                  setSort={setSort}
                  showProductsFilter={showProductsFilter}
                  showClassifiedsFilter={showClassifiedsFilter}
                />
              )}
              {!validate.isEmpty(elementsWithMap) && (HOMEKEY || EXPO) && (
                <ClassifiedsMapView
                  mapModal={mapModal}
                  setMapModal={setMapModal}
                  elements={elementsWithMap}
                />
              )}
            </View>
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
        )}
      </Fragment>
    );
  };

  const handleClick = useCallback((element) => {
    dispatch(setElementType(type));
    switch (type) {
      case 'designer':
        return dispatch(
          getDesigner({
            id: element.id,
            searchParams: params,
            redirect: true,
          }),
        );
        break;
      case 'category':
        return dispatch(
          getSearchProducts({
            name: element.name,
            searchParams: params,
            redirect: true,
          }),
        );
        break;
      case 'company':
        return dispatch(
          getCompany({
            id: element.id,
            searchParams: {user_id: element.id},
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
      case 'classified':
        return dispatch(
          getClassified({
            id: element.id,
            api_token: token ? token : null,
            redirect: true,
          }),
        );
        break;
      default:
        null;
    }
  });

  const renderItem = useCallback((item) => {
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
      case 'classified':
        return (
          <ClassifiedWidget
            element={item}
            showName={showName}
            handleClick={handleClick}
          />
        );
        break;
      case 'company':
        return (
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
        );
        break;
      case 'designer':
        return <UserWidgetHorizontal user={item} showName={true} />;
        break;
      default:
        return (
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
        );
    }
  });

  const renderEmptyComponent = () => {
    return (
      <EmptyListWidget
        emptyAnimation={animations.emptyShape}
        emptyImage={emptyListImage}
        title={I18n.t('no_', {item: I18n.t(type)})}
      />
    );
  };

  return (
    <Fragment>
      {showSearch && <TopSearchInput search={search} setSearch={setSearch} />}
      <FlatList
        ListEmptyComponent={() => renderEmptyComponent()}
        scrollEnabled={showFooter}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset, width: '100%'}}
        numColumns={columns}
        data={uniqBy(items, 'id')}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={({distanceFromEnd}) => loadMore(distanceFromEnd)}
        onMomentumScrollBegin={() => setCurrentShowMore(true)}
        onEndReachedThreshold={TheHold}
        refreshing={refresh}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => (showRefresh ? handleRefresh() : null)}
          />
        }
        contentContainerStyle={{width, minHeight: height}}
        ListHeaderComponentStyle={{
          backgroundColor: 'white',
        }}
        renderItem={({item}) => renderItem(item)}
        ListFooterComponent={() => renderFooter()}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        ListFooterComponentStyle={{
          marginBottom: bottomContentInset,
        }}
        ListHeaderComponentStyle={{
          backgroundColor: 'white',
        }}
        ListHeaderComponent={() => renderHeader()}
      />
      <SortByModal
        setSortModal={setSortModal}
        sortModal={sortModal}
        setSort={setSort}
        type={type}
      />
    </Fragment>
  );
};

export default React.memo(ElementsVerticalList);

ElementsVerticalList.propTypes = {
  elements: PropTypes.array,
  category: PropTypes.object,
  searchParams: PropTypes.object,
};
