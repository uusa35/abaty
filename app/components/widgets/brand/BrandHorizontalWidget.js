import React, {useContext} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import BrandWidget from './BrandWidget';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import {useNavigation} from '@react-navigation/native';

const BrandHorizontalWidget = ({elements, title}) => {
  const {navigate} = useNavigation();
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={widgetStyles.container}>
      <TouchableOpacity
        activeOpacity={touchOpacity}
        style={widgetStyles.titleContainer}
        onPress={() => navigate('BrandIndex')}>
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
          <BrandWidget element={c} key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default BrandHorizontalWidget;

BrandHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({});
