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
import {useNavigation} from 'react-navigation-hooks';

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
  [page, setPage] = useState(1);
  [search, setSearch] = useState('');
  return (
    <View style={widgetStyles.container}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() => {
          dispatch(
            getClassifieds({
              searchParams: searchElements,
              redirect: true,
              name: I18n.t('related_classifieds')
            })
          );
        }}>
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
              widthVal={width / 2}
              heightVal={280}
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
