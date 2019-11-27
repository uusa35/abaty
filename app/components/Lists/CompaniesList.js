import React, {useState, useMemo, useCallback, useContext} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import {getSearchCompanies} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button, Input, Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../I18n';
import {text} from './../../constants';
import {filter} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import {DispatchContext} from '../../redux/DispatchContext';
import CompanyWidgetHorizontal from '../widgets/user/CompanyWidgetHorizontal';
import {useNavigation} from 'react-navigation-hooks';

const CompaniesList = ({elements, searchParams, showMore}) => {
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [showMore, setShowMore] = useState(showMore);
  [items, setItems] = useState(elements);
  [elements, setElements] = useState(elements);
  [params, setParams] = useState(searchParams);
  [page, setPage] = useState(1);
  [search, setSearch] = useState('');
  const {dispatch} = useContext(DispatchContext);
  const {goBack} = useNavigation();

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
      console.log('params', params);
      dispatch(getSearchCompanies({searchParams: params}));
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
      endFillColor="white"
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      style={{
        width: '100%',
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
          contentContainerStyle={
            {
              // width : '100%'
            }
          }
          columnWrapperStyle={{
            alignItems: 'flex-start',
            alignSelf: 'center',
          }}
          renderItem={({item}) => (
            <CompanyWidgetHorizontal user={item} showName={true} />
          )}
          ListFooterComponent={
            <Button
              loading={isLoading}
              raised
              title={I18n.t('no_more_companies')}
              type="outline"
              titleStyle={{fontFamily: text.font}}
              onPress={() => goBack()}
            />
          }
          ListHeaderComponentStyle={{
            width: '100%',
            padding: 10,
            backgroundColor: 'white',
          }}
          ListFooterComponentStyle={{}}
          ListHeaderComponent={
            <View style={{backgroundColor: 'white'}}>
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
        <Button
          onPress={() => goBack()}
          raised
          title={I18n.t('no_companies')}
          type="outline"
          titleStyle={{fontFamily: text.font}}
          containerStyle={{
            borderWidth: 10,
            marginTop: 300,
            alignSelf: 'center',
            position: 'absolute',
            bottom: 10,
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default CompaniesList;

CompaniesList.propTypes = {
  elements: PropTypes.array.isRequired,
  category: PropTypes.object,
  searchParams: PropTypes.object,
};
