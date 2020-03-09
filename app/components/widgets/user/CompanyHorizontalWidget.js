import React, {useState, useContext} from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {getSearchCompanies} from '../../../redux/actions/user';
import {Icon} from 'react-native-elements';
import {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {touchOpacity} from '../../../constants/sizes';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import CompanyWidget from './CompanyWidget';

const CompanyHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  searchElements,
}) => {
  const [params, setParams] = useState(searchElements);
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View style={widgetStyles.container}>
      <TouchableOpacity
        activeOpacity={touchOpacity}
        style={widgetStyles.titleContainer}
        onPress={() =>
          dispatch(
            getSearchCompanies({
              searchParams: {is_company: 1},
              name,
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
        style={widgetStyles.wrapper}>
        {map(elements, (c, i) => (
          <CompanyWidget element={c} key={i} />
        ))}
      </ScrollView>
    </View>
  );
};

export default CompanyHorizontalWidget;

CompanyHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  searchElements: PropTypes.object.isRequired,
  colors: PropTypes.object,
  showName: PropTypes.bool,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    borderRadius: 200 / 2,
  },
});
