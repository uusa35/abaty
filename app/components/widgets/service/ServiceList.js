import React, {useState, useMemo} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList
} from 'react-native';
import ServiceWidget from './ServiceWidget';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import I18n, {isRTL} from './../../../I18n';
import {text, width} from '../../../constants';
import {Button, Icon, Input} from 'react-native-elements';
import {filter} from 'lodash';
import validate from 'validate.js';

const ServiceList = ({
  elements,
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  title,
  searchElements,
  colors
}) => {
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [items, setItems] = useState(elements);
  [params, setParams] = useState(searchElements);
  [page, setPage] = useState(1);
  [endList, setEndList] = useState(true);
  [search, setSearch] = useState('');
  // console.log('THE SEARCH ELEMENTS FROM SErvice LIST', searchElements);
  // console.log('THE PARAMS FROM SERVice LIST', params);
  useMemo(() => {
    if (isLoading === true && showMore) {
      return axiosInstance(`search/service?page=${page}`, {
        params
      })
        .then(r => {
          setIsLoading(false);
          setRefresh(false);
          setItems(items.concat(r.data));
        })
        .catch(e => console.log('error catch serviceList'));
    }
  }, [page]);

  useMemo(() => {
    isLoading ? setPage(page + 1) : null;
  }, [isLoading]);

  useMemo(() => {
    if (refresh && showMore) {
      // for now i don't know what products to fetch
      // console.log('the current Params', params);
      setRefresh(false);
      setIsLoading(false);
      // dispatch(getSearchServices(params));
    } else {
      setRefresh(false);
    }
  }, [refresh]);

  useMemo(() => {
    setIsLoading(false);
    setRefresh(false);
    let filtered = filter(elements, i => (i.name.includes(search) ? i : null));
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
          keyExtractor={(item, index) => index.toString()}
          onEndReachedThreshold={1}
          numColumns={2}
          data={items}
          refreshing={refresh}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => setRefresh(true)}
            />
          }
          onEndReached={() => {
            search.length > 0 ? setIsLoading(false) : setIsLoading(!isLoading);
            setEndList(false);
          }}
          contentContainerStyle={{
            width: width - 20,
            minHeight: '100%'
          }}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
          ListHeaderComponentStyle={{
            width: '100%',
            padding: 10,
            backgroundColor: 'white'
          }}
          ListHeaderComponent={
            <View>
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
                      marginBottom: 10,
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
                    {title ? title : I18n.t('related_service_group')}
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
                  title={I18n.t('no_more_services')}
                  type="outline"
                  titleStyle={{fontFamily: text.font}}
                />
              </View>
            ) : null
          }
          renderItem={({item}) => (
            <ServiceWidget service={item} showName={showName} />
          )}
        />
      ) : (
        <View style={{marginTop: 300, width: width - 50, alignSelf: 'center'}}>
          <Button
            raised
            title={I18n.t('no_services')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default ServiceList;

ServiceList.propTypes = {
  elements: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({});
