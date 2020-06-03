import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
} from 'react-native';
import {getSearchCompanies} from '../../redux/actions/user';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import {Button} from 'react-native-elements';
import I18n from './../../I18n';
import {bottomContentInset, text, TheHold} from './../../constants/sizes';
import {filter} from 'lodash';
import {axiosInstance} from '../../redux/actions/api';
import {DispatchContext} from '../../redux/DispatchContext';
import CompanyHorizontalWidget from '../widgets/user/CompanyHorizontalWidget';
import {useNavigation} from 'react-navigation-hooks';
import TopSearchInput from '../widgets/TopSearchInput';
import ElementWidgetVertical from './ElementWidgetVertical';

const CompaniesList = ({elements, searchParams, showMore = true}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentShowMore, setCurrentShowMore] = useState(showMore);
  const [items, setItems] = useState([]);
  const [params, setParams] = useState(searchParams);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const {dispatch} = useContext(DispatchContext);
  const {goBack} = useNavigation();

  const loadMore = useCallback(() => {
    setPage(page + 1);
  });

  useMemo(() => {
    if (currentShowMore) {
      return axiosInstance(`user?page=${page}`, {
        params,
      })
        .then((r) => {
          const userGroup = uniqBy(items.concat(r.data), 'id');
          setItems(userGroup);
        })
        .catch((e) => e);
    }
  }, [page]);

  const handleRefresh = useCallback(() => {
    if (currentShowMore) {
      setRefresh(false);
      setIsLoading(false);
      dispatch(getSearchCompanies({searchParams: params}));
    }
  }, [refresh]);

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
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

  useEffect(() => {
    setItems(elements);
  }, [elements]);

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
          contentInset={{bottom: bottomContentInset}}
          style={{paddingBottom: bottomContentInset}}
          numColumns={2}
          data={items}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => loadMore()}
          onEndReachedThreshold={TheHold}
          onEndReached={({distanceFromEnd}) => loadMore(distanceFromEnd)}
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
            <CompanyHorizontalWidget
              user={item}
              showRating={true}
              showName={true}
            />
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
            <View style={{paddingTop: 5, paddingBottom: 5}}>
              <TopSearchInput setSearch={setSearch} search={search} />
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
