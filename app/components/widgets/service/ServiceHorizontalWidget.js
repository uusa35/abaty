import React, {useContext} from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {getSearchServices} from '../../../redux/actions/service';
import {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import ServiceWidget from './ServiceWidget';
import {
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import {useDispatch, useSelector} from 'react-redux';

const ServiceHorizontalWidget = ({showName, title}) => {
  const dispatch = useDispatch();
  const {settings, homeServices} = useSelector((state) => state);
  return (
    <View style={[widgetStyles.container, {backgroundColor: 'transparent'}]}>
      <TouchableOpacity
        activeOpacity={touchOpacity}
        style={widgetStyles.titleContainer}
        onPress={() =>
          dispatch(
            getSearchServices({
              searchElements: {on_home: 1},
              redirect: true,
            }),
          )
        }>
        <View style={widgetStyles.titleWrapper}>
          <Text
            style={[
              widgetStyles.title,
              {color: settings.colors.header_one_theme_color},
            ]}>
            {title}
          </Text>
        </View>
        <Icon
          type="entypo"
          name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
          size={20}
          color={settings.colors.header_one_theme_color}
        />
      </TouchableOpacity>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentInset={{right: rightHorizontalContentInset}}
        style={widgetStyles.wrapper}>
        {map(homeServices, (c, i) => (
          <ServiceWidget
            element={c}
            showName={showName}
            key={i}
            minWidth={200}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default ServiceHorizontalWidget;

ServiceHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool,
};
