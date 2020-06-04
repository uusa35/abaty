import React, {useState, useMemo, useCallback} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import {getSearchDesigners} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import {
  bottomContentInset,
  text,
  TheHold,
  width,
} from './../../constants/sizes';
import {filter} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import UserWidgetHorizontal from '../widgets/user/UserWidgetHorizontal';
import TopSearchInput from '../widgets/TopSearchInput';
import UserWidgetVertical from '../widgets/user/UserWidgetVertical';
import {useDispatch} from 'react-redux';

const DesignersList = ({
  elements,
  searchParams,
  showMore,
  showSearch = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentShowMore, setCurrentShowMore] = useState(showMore);
  const [items, setItems] = useState(elements);
  const [params, setParams] = useState(searchParams);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  const loadMore = useCallback(() => {
    setCurrentShowMore(true);
    setPage(page + 1);
  });

  useMemo(() => {
    if (showMore && page > 1 && page <= 20) {
      setIsLoading(true);
      setIsLoading(false);
      setRefresh(false);
      setCurrentShowMore(false);
      return axiosInstance(`user?page=${page}`, {
        params,
      })
        .then((r) => {
          const userGroup = uniqBy(items.concat(r.data), 'id');
          setItems(userGroup);
          setItems(userGroup);
        })
        .catch((e) => e);
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchDesigners({searchParams: params}));
    }
  }, [refresh]);

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      setCurrentShowMore(false);
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
      {!validate.isEmpty(elements) ? (
        <FlatList
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
          onEndReachedThreshold={TheHold}
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
          // renderItem={({item}) => (
          //   <UserWidgetVertical user={item} showName={true} />
          // )}
          renderItem={({item}) => (
            <UserWidgetHorizontal user={item} showName={true} />
          )}
          ListFooterComponent={
            <View style={{width: '100%', minHeight: 100}}>
              <Button
                loading={isLoading}
                raised
                title={I18n.t('no_more_designers')}
                type="outline"
                titleStyle={{fontFamily: text.font}}
              />
            </View>
          }
          ListHeaderComponentStyle={{
            backgroundColor: 'white',
          }}
          ListHeaderComponent={
            showSearch ? (
              <View style={{paddingTop: 5, paddingBottom: 5}}>
                <TopSearchInput setSearch={setSearch} search={search} />
              </View>
            ) : null
          }
        />
      ) : (
        <View style={{marginTop: 300, width: width - 50, alignSelf: 'center'}}>
          <Button
            raised
            title={I18n.t('no_designers')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default DesignersList;

DesignersList.propTypes = {
  elements: PropTypes.array.isRequired,
  category: PropTypes.object,
  searchParams: PropTypes.object,
};
