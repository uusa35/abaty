import React, {useContext} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Icon} from 'react-native-elements';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {NavContext} from '../../../redux/NavContext';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import BrandWidget from './BrandWidget';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';

const BrandHorizontalWidget = ({elements, title}) => {
  const {navigation} = useContext(NavContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={widgetStyles.container}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() => navigation.navigate('BrandIndex')}>
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
          <BrandWidget element={c} key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default React.memo(BrandHorizontalWidget);

BrandHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool
};

const styles = StyleSheet.create({});
