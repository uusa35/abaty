import React, {useState, useMemo, useContext} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import CollectionWidget from './CollectionWidget';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import I18n, {isRTL} from './../../../I18n';
import {text, width} from '../../../constants';
import {Button, Icon, Input} from 'react-native-elements';
import {filter} from 'lodash';
import validate from 'validate.js';
import {getSearchProducts} from '../../../redux/actions';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {DispatchContext} from '../../../redux/DispatchContext';

const CollectionList = ({
  collections,
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  showRefresh = true,
  title,
  searchElements,
}) => {
  [elements, setElements] = useState(collections);
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [items, setItems] = useState(elements);
  [params, setParams] = useState(searchElements);
  [page, setPage] = useState(1);
  [endList, setEndList] = useState(true);
  [search, setSearch] = useState('');
  const {colors} = useContext(GlobalValuesContext);
  const {dispatch} = useContext(DispatchContext);

  useMemo(() => {
    if (isLoading && showMore) {
      return axiosInstance(`search/product?page=${page}`, {
        params,
      })
        .then(r => {
          setIsLoading(false);
          setRefresh(false);
          setItems(items.concat(r.data));
        })
        .catch(e => e);
    }
  }, [page]);

  useMemo(() => {
    if (isLoading && showMore) {
      setPage(page + 1);
    } else {
      setIsLoading(false);
    }
  }, [isLoading]);

  useMemo(() => {
    if (refresh && showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchProducts({searchElements: params, title}));
    } else {
      setRefresh(false);
    }
  }, [refresh]);

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      let filtered = filter(elements, i =>
        i.slug.includes(search) ? i : null,
      );
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
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
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1}
          numColumns={2}
          data={items}
          refreshing={refresh}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => (showRefresh ? setRefresh(true) : null)}
            />
          }
          onEndReached={() => {
            search.length > 0 && !validate.isEmpty(search)
              ? setIsLoading(false)
              : setIsLoading(!isLoading);
            setEndList(false);
          }}
          contentContainerStyle={{
            width: width - 20,
            minHeight: '100%',
          }}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
          ListHeaderComponentStyle={{
            width: '100%',
            padding: 10,
            backgroundColor: 'white',
          }}
          ListHeaderComponent={
            <View>
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
                      marginBottom: 10,
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
              <View style={{minHeight: 100}}>
                <Button
                  loading={endList}
                  raised
                  title={I18n.t('no_more_collections')}
                  type="outline"
                  titleStyle={{fontFamily: text.font}}
                />
              </View>
            ) : null
          }
          renderItem={({item}) => (
            <CollectionWidget element={item} showName={showName} />
          )}
        />
      ) : (
        <View
          style={{marginTop: '20%', width: width - 50, alignSelf: 'center'}}>
          <Button
            raised
            title={I18n.t('no_collections')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default CollectionList;

CollectionList.propTypes = {
  collections: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  showName: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  colors: PropTypes.object,
};

const styles = StyleSheet.create({});
