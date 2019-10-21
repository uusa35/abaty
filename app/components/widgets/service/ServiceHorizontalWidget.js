import React, {useContext} from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {getSearchProducts, getSearchServices} from '../../../redux/actions';
import {DispatchContext} from '../../../redux/DispatchContext';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import ProductWidget from './../product/ProductWidget';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import ServiceWidget from './ServiceWidget';

const ServiceHorizontalWidget = ({elements, showName, title}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={[widgetStyles.container, {backgroundColor: 'transparent'}]}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() =>
          dispatch(
            getSearchServices({searchElements: {on_home: true}, redirect: true})
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
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={widgetStyles.wrapper}>
        {map(elements, (c, i) => (
          <ServiceWidget
            element={c}
            showName={showName}
            key={i}
            dispatch={dispatch}
            colors={colors}
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
  dispatch: PropTypes.func.isRequired
};
