import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react';
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
import I18n from './../../../I18n';
import {
  bottomContentInset,
  height,
  iconSizes,
  text,
  TheHold,
  width,
} from '../../../constants/sizes';
import {Button, Icon, Input} from 'react-native-elements';
import {filter, uniqBy} from 'lodash';
import validate from 'validate.js';
import {getSearchServices} from '../../../redux/actions/service';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import NoMoreElements from '../NoMoreElements';
import TopSearchInput from '../TopSearchInput';
import {useDispatch} from 'react-redux';
import EmptyListWidget from '../../Lists/EmptyListWidget';
import {animations} from '../../../constants/animations';

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
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentShowMore, setCurrentShowMore] = useState(showMore);
  const [params, setParams] = useState(searchElements);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const loadMore = useCallback(() => {
    if (currentShowMore) {
      setPage(page + 1);
      setIsLoading(true);
    }
  });

  useMemo(() => {
    if (currentShowMore && page > 1 && page <= 20) {
      return axiosInstance(`search/service?page=${page}`, {
        params,
      })
        .then(r => {
          const serviceGroup = uniqBy(items.concat(r.data), 'id');
          setItems(serviceGroup);
        })
        .catch(e => e);
    }
  }, [page]);

  const handleRefresh = () => {
    if (currentShowMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchServices({searchElements: params}));
    }
  };

  useMemo(() => {
    setIsLoading(false);
    setRefresh(false);
    if (search.length > 0) {
      let filtered = filter(items, i => (i.name.includes(search) ? i : null));
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
    } else {
      setItems(items);
    }
  }, [search]);

  useEffect(() => {
    setItems(services);
  }, [services]);

  useMemo(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [items]);

  return (
    <KeyboardAvoidingView behavior="padding" enabled>
      <FlatList
        ListEmptyComponent={
          <EmptyListWidget
            title={I18n.t('no_services')}
            emptyAnimation={animations.emptyShape}
          />
        }
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        horizontal={false}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        keyExtractor={(item, index) => index.toString()}
        onEndReachedThreshold={TheHold}
        contentInset={{bottom: bottomContentInset}}
        style={{paddingBottom: bottomContentInset}}
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
          paddingBottom: 200,
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
          showFooter && !validate.isEmpty(services) ? (
            <NoMoreElements
              title={I18n.t('no_more_services')}
              isLoading={refresh}
            />
          ) : null
        }
        ListFooterComponentStyle={{
          marginBottom: bottomContentInset,
        }}
        renderItem={({item}) => (
          <ServiceWidget element={item} showName={showName} />
        )}
      />
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
