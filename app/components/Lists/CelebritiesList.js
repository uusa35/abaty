import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import {getSearchCelebrities} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button, Input, Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../I18n';
import {text, width} from './../../constants';
import {filter} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import UserWidgetHorizontal from '../widgets/user/UserWidgetHorizontal';

const CelebritiesList = ({elements, searchParams, dispatch, showMore}) => {
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [showMore, setShowMore] = useState(showMore);
  [items, setItems] = useState(elements);
  [elements, setElements] = useState(elements);
  [params, setParams] = useState(searchParams);
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
      return axiosInstance(`user?page=${page}`, {
        params,
      })
        .then(r => {
          const userGroup = uniqBy(items.concat(r.data), 'id');
          setItems(userGroup);
          setElements(userGroup);
        })
        .catch(e => e);
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchCelebrities({searchParams: params}));
    }
  }, [refresh]);

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      setShowMore(false);
      let filtered = filter(elements, i =>
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
          numColumns={2}
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
            width: width - 20,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          renderItem={({item}) => (
            <UserWidgetHorizontal user={item} showName={true} />
          )}
          ListFooterComponent={
            <View style={{width: '100%', minHeight: 100}}>
              <Button
                loading={isLoading}
                raised
                title={I18n.t('no_more_elements')}
                type="outline"
                titleStyle={{fontFamily: text.font}}
              />
            </View>
          }
          ListHeaderComponentStyle={{
            width: '100%',
            padding: 10,
            backgroundColor: 'white',
          }}
          ListHeaderComponent={
            <View>
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
                  marginTop: 20,
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
            </View>
          }
        />
      ) : (
        <View style={{marginTop: 300, width: width - 50, alignSelf: 'center'}}>
          <Button
            raised
            title={I18n.t('no_users')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default CelebritiesList;

CelebritiesList.propTypes = {
  elements: PropTypes.array.isRequired,
  category: PropTypes.object,
  searchParams: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};
