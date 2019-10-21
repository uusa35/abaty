import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import I18n, {isRTL} from './../../../I18n';
import {text, width} from '../../../constants';
import {Button, Icon} from 'react-native-elements';
import {map} from 'lodash';
import validate from 'validate.js';
import {getSearchClassifieds} from '../../../redux/actions';
import widgetStyles from '../widgetStyles';
import ClassifiedWidgetHorizontal from './ClassifiedWidgetHorizontal';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const ClassifiedListHorizontal = ({
  classifieds,
  showName = true,
  showSearch = true,
  showFooter = true,
  showTitle = false,
  showMore = true,
  showRefresh = true,
  title,
  searchElements
}) => {
  [items, setItems] = useState(classifieds);
  [elements, setElements] = useState(classifieds);
  [isLoading, setIsLoading] = useState(false);
  [refresh, setRefresh] = useState(false);
  [showMore, setShowMore] = useState(showMore);
  [items, setItems] = useState(elements);
  [page, setPage] = useState(1);
  [search, setSearch] = useState('');
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);

  return (
    <View style={widgetStyles.container}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() => {
          dispatch(
            getSearchClassifieds({
              searchParams: {},
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
  showName: PropTypes.bool
};

const styles = StyleSheet.create({});
