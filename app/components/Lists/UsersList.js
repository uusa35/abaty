import React, {useContext, useState, useMemo, useEffect} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import {getUsers} from '../../redux/actions';
import {DispatchContext} from '../../redux/DispatchContext';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button, Input, Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../I18n';
import {text, width} from './../../constants';
import {NavContext} from '../../redux/NavContext';
import {has, filter} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import UserWidgetHorizontal from '../widgets/user/UserWidgetHorizontal';

const UsersList = ({elements}) => {
  const {dispatch} = useContext(DispatchContext);
  const {navigation} = useContext(NavContext);
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [items, setItems] = useState(elements);
  [searchElements, setSearchElements] = useState(
    has(navigation, 'state') ? navigation.state.params.searchElements : null
  );
  [page, setPage] = useState(1);
  [endList, setEndList] = useState('test');
  [search, setSearch] = useState('');

  useMemo(() => {
    if (isLoading === true) {
      setIsLoading(false);
      return axiosInstance(`user?page=${page}`, {
        params: searchElements
      })
        .then(r => {
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
      dispatch(getUsers(searchElements));
      setIsLoading(false);
    }
  }, [refresh]);

  useMemo(() => {
    let filtered = filter(elements, i => (i.slug.includes(search) ? i : null));
    filtered.length > 0 || search.length > 0
      ? setItems(filtered)
      : setItems([]);
  }, [search]);

  return (
    <KeyboardAvoidingView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: width
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
          onEndReached={() => setIsLoading(!isLoading)}
          onEndReachedThreshold={1}
          refreshing={refresh}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(true)}
            />
          }
          contentContainerStyle={{
            width: width - 20,
            paddingLeft: 5,
            paddingRight: 5
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
          renderItem={({item}) => (
            <UserWidgetHorizontal user={item} showName={true} />
          )}
          ListFooterComponent={
            <View style={{width: '100%', minHeight: 100}}>
              <Button
                loading={isLoading}
                raised
                title={I18n.t('no_more_users')}
                type="outline"
                titleStyle={{fontFamily: text.font}}
              />
            </View>
          }
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
                marginTop: 20,
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

export default React.memo(UsersList);

UsersList.propTypes = {
  elements: PropTypes.array,
  category: PropTypes.object,
  searchElements: PropTypes.object
};
