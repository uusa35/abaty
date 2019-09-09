import React, {useState, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
import ProductWidget from './ProductWidget';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import I18n, {isRTL} from './../../../I18n';
import {text, width} from '../../../constants';
import {Button, Icon, Input} from 'react-native-elements';
import {filter, uniqBy} from 'lodash';
import validate from 'validate.js';
import {getSearchProducts} from '../../../redux/actions';

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
  colors,
  dispatch
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
        params
      })
        .then(r => {
          const productsGroup = uniqBy(items.concat(r.data), 'id');
          setItems(productsGroup);
          setElements(productsGroup);
        })
        .catch(e => e);
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchProducts({searchParams: params, redirect: true}));
    }
  }, [refresh]);

  useMemo(() => {
    setShowMore(false);
    setIsLoading(false);
    setRefresh(false);
    if (search.length > 0) {
      let filtered = filter(elements, i =>
        i.name.includes(search) ? i : null
      );
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
    } else {
      setItems(elements);
    }
  }, [search]);

  return (
    <KeyboardAvoidingView style={{}} behavior="padding" enabled>
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
          // contentInset={{bottom: 60}}
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
            marginBottom: 15,
            justifyContent: 'flex-start'
          }}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
          ListHeaderComponentStyle={{
            backgroundColor: 'white'
          }}
          ListHeaderComponent={
            <View style={{paddingTop: 10, paddingBottom: 10}}>
              {showSearch ? (
                <Input
                  placeholder={I18n.t('search')}
                  inputStyle={{
                    fontFamily: text.font,
                    textAlign: isRTL ? 'right' : 'left'
                  }}
                  inputContainerStyle={{
                    backgroundColor: '#E4E4E5',
                    borderRadius: 30,
                    paddingRight: 15,
                    paddingLeft: 15,
                    marginTop: 10,
                    borderColor: '#E4E4E5'
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
                        height: 1
                      },
                      shadowOpacity: 0.18,
                      shadowRadius: 1.0,
                      elevation: 1
                    }}>
                    {title ? title : I18n.t('related_product_group')}
                  </Text>
                </View>
              ) : null}
            </View>
          }
          ListFooterComponent={() =>
            showFooter ? (
              <View style={{paddingTop: 10, paddingBottom: 10, flex: 1}}>
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
            <ProductWidget
              element={item}
              showName={showName}
              dispatch={dispatch}
              colors={colors}
            />
          )}
        />
      ) : (
        <View
          style={{marginTop: '20%', width: width - 50, alignSelf: 'center'}}>
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
  dispatch: PropTypes.func.isRequired,
  colors: PropTypes.object
};

const styles = StyleSheet.create({});
