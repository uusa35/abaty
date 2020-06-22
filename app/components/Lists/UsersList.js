import React, {useState, useMemo, useCallback, useContext} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import {getUsers} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import {bottomContentInset, text, width} from './../../constants/sizes';
import {filter} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import UserWidgetHorizontal from '../widgets/user/UserWidgetHorizontal';
import TopSearchInput from '../widgets/TopSearchInput';
import {useDispatch} from 'react-redux';
import EmptyListWidget from './EmptyListWidget';

const UsersList = ({elements, searchElements, showMore}) => {
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [showMore, setShowMore] = useState(showMore);
  [items, setItems] = useState(elements);
  [elements, setElements] = useState(elements);
  [params, setParams] = useState(searchElements);
  [page, setPage] = useState(1);
  [search, setSearch] = useState('');
  const dispatch = useDispatch();

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

  const handleRefresh = useCallback(() => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getUsers({searchParams: params}));
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
      <FlatList
        ListEmptyComponent={<EmptyListWidget title={I18n.t('no_users')} />}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}
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
          <View style={{paddingTop: 5, paddingBottom: 5}}>
            <TopSearchInput setSearch={setSearch} />
          </View>
        }
      />
    </KeyboardAvoidingView>
  );
};

export default UsersList;

UsersList.propTypes = {
  elements: PropTypes.array,
  category: PropTypes.object,
  searchParams: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};
