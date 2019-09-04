import React, {useState, useMemo, useCallback} from 'react';
import {
  StyleSheet,
  RefreshControl,
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import {axiosInstance} from '../../../redux/actions/api';
import I18n, {isRTL} from './../../../I18n';
import {text, width} from '../../../constants';
import {Button, Icon, Input} from 'react-native-elements';
import {filter, uniqBy, map} from 'lodash';
import validate from 'validate.js';
import {
  getClassifieds,
  getSearchProducts,
  getUsers
} from '../../../redux/actions';
import ClassifiedWidget from './ClassifiedWidget';
import widgetStyles from '../widgetStyles';
import ClassifiedWidgetHorizontal from './ClassifiedWidgetHorizontal';

const ClassifiedListHorizontal = ({
  classifieds,
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  showRefresh = true,
  title,
  searchElements,
  colors,
  dispatch
}) => {
  [items, setItems] = useState(classifieds);
  [elements, setElements] = useState(classifieds);
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [showMore, setShowMore] = useState(showMore);
  [items, setItems] = useState(elements);
  [params, setParams] = useState(searchElements);
  [page, setPage] = useState(1);
  [search, setSearch] = useState('');

  console.log('the page from outeside ::', page);

  const handleLoading = useCallback(() => {
    setPage(page + 1);
    setIsLoading(true);
    if (showMore) {
      return axiosInstance(`search/classified?page=${page}`, {
        params
      })
        .then(r => {
          setIsLoading(false);
          setRefresh(false);
          const classifiedGroup = uniqBy(items.concat(r.data), 'id');
          console.log('the page', page);
          setItems(classifiedGroup);
          setElements(classifiedGroup);
        })
        .catch(e => {
          setIsLoading(false);
          setRefresh(false);
        });
    }
  }, [isLoading, showMore, page]);

  const handleRefresh = useCallback(() => {
    if (refresh && showMore) {
      console.log('Classifieds Refresh List');
      setRefresh(false);
      setIsLoading(false);
      dispatch(getClassifieds({params: {on_home: true, page: 1}}));
    } else {
      setRefresh(false);
    }
  }, [refresh]);

  useMemo(() => {
    if (search.length > 0) {
      setIsLoading(false);
      setRefresh(false);
      setShowMore(false);
      let filtered = filter(elements, i =>
        i.name.includes(search) ? i : null
      );
      filtered.length > 0 || search.length > 0
        ? setItems(filtered)
        : setItems([]);
    } else {
      setShowMore(true);
      setItems(elements);
    }
  }, [search]);

  return (
    <View style={widgetStyles.container}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() =>
          dispatch(
            getUsers({
              type: title === 'designers' ? 'is_designer' : 'is_celebrity',
              name
            })
          )
        }>
        <View style={widgetStyles.titleWrapper}>
          <Text
            style={[
              widgetStyles.title,
              {color: colors.header_one_theme_color}
            ]}>
            {I18n.t(title)}
          </Text>
        </View>
        <Icon
          type="entypo"
          name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
          size={20}
          color={colors.header_one_theme_color}
        />
      </TouchableOpacity>
      {!validate.isEmpty(elements) ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[widgetStyles.wrapper, {}]}>
          {map(elements, (c, i) => (
            <ClassifiedWidgetHorizontal
              widthVal={width - 200}
              heightVal={180}
              key={i}
              dispatch={dispatch}
              element={c}
            />
          ))}
        </ScrollView>
      ) : (
        <View
          style={{marginTop: '20%', width: width - 50, alignSelf: 'center'}}>
          <Button
            raised
            title={I18n.t('no_classifieds')}
            type="outline"
            titleStyle={{fontFamily: text.font}}
          />
        </View>
      )}
    </View>
  );
};

export default ClassifiedListHorizontal;

ClassifiedListHorizontal.propTypes = {
  classifieds: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  showName: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  colors: PropTypes.object
};

const styles = StyleSheet.create({});
