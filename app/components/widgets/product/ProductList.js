import React, {useState, useMemo, useCallback, useContext} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import ProductWidget from './ProductWidget';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import I18n, {isRTL} from './../../../I18n';
import {text, width, height} from '../../../constants';
import {Button, Icon, Input} from 'react-native-elements';
import {filter, uniqBy} from 'lodash';
import validate from 'validate.js';
import {getSearchProducts} from '../../../redux/actions/product';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {DispatchContext} from '../../../redux/DispatchContext';

const ProductList = ({
  products,
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  showRefresh = true,
  title,
  searchElements,
}) => {
  [items, setItems] = useState(products);
  [elements, setElements] = useState(products);
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [showMore, setShowMore] = useState(showMore);
  [items, setItems] = useState(elements);
  [params, setParams] = useState(searchElements);
  [page, setPage] = useState(1);
  [search, setSearch] = useState('');
  const {colors} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);

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
      return axiosInstance(`search/product?page=${page}`, {
        params,
      })
        .then(r => {
          if (!validate.isEmpty(items) || !validate.isEmpty(r.data)) {
            const productsGroup = uniqBy(items.concat(r.data), 'id');
            setItems(productsGroup);
            setElements(productsGroup);
          }
        })
        .catch(e => e);
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      console.log('getSearchProducts fired from productList');
      dispatch(getSearchProducts({searchParams: params, redirect: false}));
    }
  }, [refresh]);

  useMemo(() => {
    setShowMore(false);
    setIsLoading(false);
    setRefresh(false);
    if (search.length > 0) {
      let filtered = filter(elements, i =>
        i.name.includes(search) ? i : null,
      );
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
    } else {
      setItems(elements);
    }
  }, [search]);

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
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
          onEndReachedThreshold={1}
          contentInset={{bottom: 150}}
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
            marginBottom: 15,
            justifyContent: 'flex-start',
            minHeight: height / 1.2,
          }}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            alignSelf: 'center',
            alignItems: 'flex-start',
          }}
          ListHeaderComponentStyle={{
            backgroundColor: 'white',
          }}
          ListHeaderComponent={
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              {showSearch ? (
                <Input
                  placeholder={I18n.t('search')}
                  inputStyle={{
                    fontFamily: text.font,
                    textAlign: isRTL ? 'right' : 'left',
                  }}
                  inputContainerStyle={{
                    backgroundColor: '#E4E4E5',
                    borderRadius: 30,
                    paddingRight: 15,
                    paddingLeft: 15,
                    marginTop: 10,
                    borderColor: '#E4E4E5',
                  }}
                  rightIcon={
                    <Icon
                      onPress={() => setSearch('')}
                      hitSlop={{top: 30, bottom: 30, left: 30, right: 30}}
                      type="evilIcons"
                      name={search.length > 0 ? 'close' : 'search'}
                      color="#c4c4c4"
                      size={18}
                      color="black"
                    />
                  }
                  onChangeText={e => setSearch(e)}
                  value={search}
                />
              ) : null}
              {showTitle ? (
                <View>
                  <Text
                    style={{
                      fontFamily: text.font,
                      fontSize: text.large,
                      marginTop: 20,
                      marginBottom: 5,
                      paddingLeft: 20,
                      paddingRight: 20,
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
                    {title ? title : I18n.t('related_product_group')}
                  </Text>
                </View>
              ) : null}
            </View>
          }
          ListFooterComponent={() =>
            showFooter ? (
              <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
                <Button
                  loading={isLoading}
                  raised
                  title={I18n.t('no_more_products')}
                  type="outline"
                  titleStyle={{fontFamily: text.font}}
                />
              </View>
            ) : null
          }
          renderItem={({item}) => (
            <ProductWidget element={item} showName={showName} />
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            width: width - 50,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
          <Button
            raised
            title={I18n.t('no_products')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ProductList;

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({});
