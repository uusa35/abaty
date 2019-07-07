import React, {useState, useContext, useMemo} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList
} from 'react-native';
import ProductWidget from './ProductWidget';
import {CountryContext} from '../../../redux/CountryContext';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import {NavContext} from '../../../redux/NavContext';
import I18n, {isRTL} from './../../../I18n';
import {text, width} from '../../../constants';
import {Button, Icon, Input} from 'react-native-elements';
import {filter, has} from 'lodash';
import {DispatchContext} from '../../../redux/DispatchContext';
import validate from 'validate.js';
import {getSearchProducts} from '../../../redux/actions';

const ProductList = ({elements, showName}) => {
  const {dispatch} = useContext(DispatchContext);
  const {country} = useContext(CountryContext);
  const {navigation} = useContext(NavContext);
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [items, setItems] = useState(elements);
  [searchElements, setSearchElements] = useState(
    has(navigation, 'state') ? navigation.state.params : null
  );
  [page, setPage] = useState(1);
  [endList, setEndList] = useState('test');
  [search, setSearch] = useState('');

  useMemo(() => {
    if (isLoading === true) {
      // console.log('searchElements', searchElements);
      // console.log('thhe page', page);
      return axiosInstance(`search/product?page=${page}`, {
        params: searchElements
      })
        .then(r => {
          setIsLoading(false);
          setRefresh(false);
          setItems(items.concat(r.data));
        })
        .catch(e => setEndList(e.response.data));
    }
  }, [page]);

  useMemo(() => {
    isLoading ? setPage(page + 1) : null;
  }, [isLoading]);

  useMemo(() => {
    if (refresh) {
      // for now i don't know what products to fetch
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchProducts(searchElements));
    }
  }, [refresh]);

  useMemo(() => {
    let filtered = filter(elements, i => (i.name.includes(search) ? i : null));
    filtered.length > 0 || search.length > 0
      ? setItems(filtered)
      : setItems([]);
  }, [search]);

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding" enabled>
      {!validate.isEmpty(elements) ? (
        <FlatList
          horizontal={false}
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          contentContainerStyle={{width: width, justifyContent: 'center'}}
          columnWrapperStyle={{
            margin: 5,
            justifyContent: 'center',
            alignItems: 'center'
          }}
          numColumns={2}
          data={items}
          refreshing={refresh}
          ListHeaderComponentStyle={{backgroundColor: 'white', padding: 10}}
          ListHeaderComponent={
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
          }
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(true)}
            />
          }
          ListFooterComponent={
            <View style={{minHeight: 100}}>
              <Button
                loading={isLoading}
                raised
                title={I18n.t('no_more_products')}
                type="outline"
                titleStyle={{fontFamily: text.font}}
              />
            </View>
          }
          renderItem={({item}) => (
            <ProductWidget product={item} showName={showName} />
          )}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => setIsLoading(!isLoading)}
          onEndReachedThreshold={1}
        />
      ) : (
        <View style={{marginTop: 300, width: width - 50, alignSelf: 'center'}}>
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

export default React.memo(ProductList);

ProductList.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({});
