import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import I18n, {isRTL} from './../../../I18n';
import {
  rightHorizontalContentInset,
  text,
  touchOpacity,
  width,
} from '../../../constants/sizes';
import {Button, Icon} from 'react-native-elements';
import {map} from 'lodash';
import validate from 'validate.js';
import {getSearchClassifieds} from '../../../redux/actions/classified';
import widgetStyles from '../widgetStyles';
import ClassifiedWidgetHorizontal from './ClassifiedWidgetHorizontal';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useDispatch} from 'react-redux';
import {setElementType} from '../../../redux/actions';

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
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [currentShowMore, setCurrentShowMore] = useState(showMore);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);

  const handleClick = () => {
    dispatch(setElementType('classified'));
    dispatch(
      getSearchClassifieds({
        searchParams: {},
        redirect: true,
        name: I18n.t('related_classifieds'),
      }),
    );
  };
  return (
    <View style={widgetStyles.container}>
      <TouchableOpacity
        activeOpacity={touchOpacity}
        style={widgetStyles.titleContainer}
        onPress={() => {
          handleClick();
        }}>
        <View style={widgetStyles.titleWrapper}>
          <Text
            style={[
              widgetStyles.title,
              {color: colors.header_one_theme_color},
            ]}>
            {title}
          </Text>
        </View>
        <Icon
          type="entypo"
          name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
          size={20}
          color={colors.header_one_theme_color}
        />
      </TouchableOpacity>
      {!validate.isEmpty(classifieds) ? (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentInset={{right: rightHorizontalContentInset}}
          style={[widgetStyles.wrapper, {}]}>
          {map(classifieds, (c, i) => (
            <ClassifiedWidgetHorizontal
              widthVal={width / 2}
              heightVal={280}
              key={i}
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
};

const styles = StyleSheet.create({});
