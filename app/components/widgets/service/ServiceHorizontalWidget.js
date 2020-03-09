import React, {useContext} from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {getSearchServices} from '../../../redux/actions/service';
import {DispatchContext} from '../../../redux/DispatchContext';
import {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import ServiceWidget from './ServiceWidget';
import {rightHorizontalContentInset, touchOpacity} from '../../../constants/sizes';

const ServiceHorizontalWidget = ({elements, showName, title}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
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
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentInset={{right: rightHorizontalContentInset}}
        style={widgetStyles.wrapper}>
        {map(elements, (c, i) => (
          <ServiceWidget element={c} showName={showName} key={i} />
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
