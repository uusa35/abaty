import React, {useCallback, useContext} from 'react';
import {
  ScrollView,
  Pressable,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {getSearchServices, getService} from '../../../redux/actions/service';
import {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import ServiceWidget from './ServiceWidget';
import {
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import {useDispatch, useSelector} from 'react-redux';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useNavigation} from '@react-navigation/native';

const ServiceHorizontalWidget = ({showName, title}) => {
  const {colors} = useContext(GlobalValuesContext);
  const dispatch = useDispatch();
  const {settings, homeServices, token} = useSelector(state => state);
  const navigation = useNavigation();

  const handleClick = element => {
    return dispatch(
      getService({
        id: element.id,
        api_token: token ? token : null,
        redirect: true,
      }),
    );
  };

  return (
    <View style={[widgetStyles.container, {backgroundColor: 'transparent'}]}>
      <Pressable
        activeOpacity={touchOpacity}
        style={[
          widgetStyles.titleContainer,
          {
            borderBottomWidth: 0.5,
            borderBottomColor: colors.btn_theme_color,
            paddingLeft: 10,
            paddingRight: 10,
            paddingBottom: 10,
          },
        ]}
        onPress={() => navigation.navigate('ServiceTab')}>
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
      </Pressable>
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
            handleClick={handleClick}
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
