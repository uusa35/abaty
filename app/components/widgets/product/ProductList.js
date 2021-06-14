import React, {useState, useMemo, useCallback, useEffect} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import ProductWidget from './ProductWidget';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import I18n from './../../../I18n';
import {
  text,
  width,
  bottomContentInset,
  iconSizes,
  TheHold,
} from '../../../constants/sizes';
import {Icon} from 'react-native-elements';
import {filter, uniqBy, orderBy} from 'lodash';
import validate from 'validate.js';
import {getProduct, getSearchProducts} from '../../../redux/actions/product';
import NoMoreElements from '../NoMoreElements';
import TopSearchInput from '../TopSearchInput';
import SearchSort from '../search/SearchSort';
import SortByModal from '../search/SortByModal';
import {useDispatch, useSelector} from 'react-redux';
import EmptyListWidget from '../../Lists/EmptyListWidget';

const ProductList = ({
  products = [],
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  showRefresh = true,
  showSortSearch = false,
  showProductsFilter = false,
  title,
  showTitleIcons = false,
  showSortPrice = true,
  showSortAlpha = true,
  searchElements,
  emptyImage = null,
}) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentShowMore, setCurrentShowMore] = useState(showMore);
  const [params, setParams] = useState(searchElements);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [sortModal, setSortModal] = useState(false);
  const {colors} = useSelector(state => state.settings);
  const token = useSelector(state => state.token);
  const dispatch = useDispatch();

  const loadMore = e => {
    if (currentShowMore) {
      setPage(parseInt(page + 1));
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
      default:
        items;
    }
    setSortModal(false);
  }, [sort]);

  useMemo(() => {
    if (showMore && page > 1 && page <= 20) {
      axiosInstance(`search/product?page=${page}`, {
        params,
      })
        .then(r => {
          if (!validate.isEmpty(r.data)) {
            const productsGroup = uniqBy(items.concat(r.data), 'id');
            setItems(productsGroup);
          }
        })
        .catch(e => e);
    }
  }, [page]);

  const handleRefresh = () => {
    if (currentShowMore) {
      setRefresh(false);
      dispatch(getSearchProducts({searchParams: params, redirect: false}));
    }
  };

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      let filtered = filter(items, i => (i.name.includes(search) ? i : null));
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
    } else {
      setItems(products);
    }
  }, [search]);

  useEffect(() => {
    setItems(products);
  }, [products]);

  const handleClickProductWidget = useCallback(id => {
    dispatch(
      getProduct({
        id,
        api_token: token ? token : null,
        redirect: true,
      }),
    );
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <FlatList
        ListEmptyComponent={<EmptyListWidget title={I18n.t('no_products')} />}
        scrollEnabled={showFooter}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        automaticallyAdjustContentInsets={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={TheHold}
        onEndReached={({distanceFromEnd}) => loadMore(distanceFromEnd)}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}
        numColumns={2}
        data={uniqBy(items, 'id')}
        refreshing={refresh}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => (showRefresh ? handleRefresh() : null)}
          />
        }
        contentContainerStyle={styles.container}
        disableVirtualization={false}
        columnWrapperStyle={{
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          alignSelf: 'center',
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
            {showSearch ? (
              <TopSearchInput search={search} setSearch={setSearch} />
            ) : null}
            {showSortSearch && (
              <SearchSort
                sort={sort}
                sortModal={sortModal}
                setSortModal={setSortModal}
                setSort={setSort}
                showProductsFilter={showProductsFilter}
              />
            )}
            {showTitle ? (
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
                {showTitleIcons ? (
                  <Icon
                    type="entypo"
                    name="select-arrows"
                    size={iconSizes.smaller}
                    onPress={() => setSortModal(true)}
                  />
                ) : null}
              </View>
            ) : null}
          </View>
        }
        ListFooterComponentStyle={{
          marginBottom: bottomContentInset,
        }}
        ListFooterComponent={() =>
          showFooter || !validate.isEmpty(products) || !isLoading ? (
            <NoMoreElements
              title={I18n.t('no_more_products')}
              isLoading={isLoading}
            />
          ) : (
            <ActivityIndicator size={iconSizes.larger} />
          )
        }
        renderItem={({item}) => (
          <ProductWidget
            element={item}
            showName={showName}
            key={item.id}
            handleClickProductWidget={handleClickProductWidget}
          />
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

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    alignSelf: 'center',
    // minHeight: height,
    minWidth: '100%',
    flexGrow: 1,
  },
  mainTitle: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    paddingRight: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  emptyCaseBtn: {
    marginTop: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'center',
  },
  sortModalContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    paddingTop: 15,
  },
  wrapper: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    backgroundColor: 'white',
    paddingTop: 15,
    height: 50,
  },
  phoneNo: {
    fontFamily: text.font,
    fontSize: text.large,
    paddingLeft: 20,
    margin: 0,
    padding: 0,
    textAlign: 'center',
  },
  countryFlag: {
    width: 45,
    height: 25,
    marginLeft: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    padding: 15,
  },
  btnTitle: {
    fontFamily: text.font,
    fontSize: text.small,
    paddingLeft: 15,
    paddingRight: 15,
  },
  btnStyle: {
    flexDirection: 'row',
    borderWidth: 0.5,
    borderRadius: 4,
    width: width / 2.1,
    minHeight: 40,
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
    marginTop: 4,
    marginBottom: 4,
    marginLeft: 4,
    marginRight: 4,
    shadowColor: 'black',
    shadowOffset: {
      width: 0.1,
      height: 0.2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2.0,
    elevation: 1,
  },
});
