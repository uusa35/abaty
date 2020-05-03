import React, {useState, useMemo, useCallback, useContext} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import ServiceWidget from './ServiceWidget';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import I18n, {isRTL} from './../../../I18n';
import {height, text, width} from '../../../constants/sizes';
import {Button, Icon, Input} from 'react-native-elements';
import {filter, uniqBy} from 'lodash';
import validate from 'validate.js';
import {getSearchServices} from '../../../redux/actions/service';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import NoMoreElements from '../NoMoreElements';

const ServiceList = ({
  services,
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  title,
  searchElements,
}) => {
  [items, setItems] = useState(services);
  [elements, setElements] = useState(services);
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [showMore, setShowMore] = useState(showMore);
  [params, setParams] = useState(searchElements);
  [page, setPage] = useState(1);
  [search, setSearch] = useState('');
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);

  const loadMore = useCallback(() => {
    setShowMore(true);
    setPage(page + 1);
  });

  useMemo(() => {
    setIsLoading(true);
    setIsLoading(false);
    setRefresh(false);
    setShowMore(false);
    if (showMore) {
      return axiosInstance(`search/service?page=${page}`, {
        params,
      })
        .then(r => {
          const serviceGroup = uniqBy(items.concat(r.data), 'id');
          setItems(serviceGroup);
          setElements(serviceGroup);
        })
        .catch(e => e);
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    if (showMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchServices({searchElements: params}));
    }
  }, [refresh]);

  useMemo(() => {
    setIsLoading(false);
    setRefresh(false);
    setShowMore(false);
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
      {!validate.isEmpty(services) ? (
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
              onRefresh={() => handleRefresh()}
            />
          }
          onEndReached={() => loadMore()}
          contentContainerStyle={{
            marginBottom: 15,
            alignSelf: 'center',
            minHeight: height,
            minWidth: '100%',
            flexGrow: 1,
          }}
          disableVirtualization={false}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            alignSelf: 'center',
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
                    {title ? title : I18n.t('related_service_group')}
                  </Text>
                </View>
              ) : null}
            </View>
          }
          ListFooterComponent={() =>
            showFooter ? (
              <NoMoreElements
                title={I18n.t('no_more_services')}
                isLoading={refresh}
              />
            ) : null
          }
          renderItem={({item}) => (
            <ServiceWidget element={item} showName={showName} />
          )}
        />
      ) : (
        <View
          style={{
            minHeight: '100%',
            width: width - 50,
            alignSelf: 'center',
            justifyContent: 'center',
          }}>
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
  services: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({});
