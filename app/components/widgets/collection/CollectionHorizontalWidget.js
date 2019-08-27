import React from 'react';
import {ScrollView, TouchableOpacity, Text, View} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import CollectionWidget from './CollectionWidget';
import CollectionInfoWidget from './CollectionInfoWidget';
import {useNavigation} from 'react-navigation-hooks';

const CollectionHorizontalWidget = ({
  elements,
  showName,
  title,
  dispatch,
  colors
}) => {
  return (
    <View style={[widgetStyles.container, {backgroundColor: '#FAFAFA'}]}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() => dispatch({type: 'GET_COLLECTIONS'})}>
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
          <CollectionWidget
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

export default CollectionHorizontalWidget;

CollectionInfoWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  colors: PropTypes.object.isRequired,
  showName: PropTypes.bool
};
