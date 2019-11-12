import React, {useCallback, useContext} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {
  enableErrorMessage,
  getSearchClassifieds,
  setCategory,
  setCategoryAndGoToNavChildren,
} from '../../../redux/actions';
import I18n, {isRTL} from './../../../I18n';
import {Icon} from 'react-native-elements';
import widgetStyles from './../widgetStyles';
import {images} from '../../../constants';
import {DispatchContext} from '../../../redux/DispatchContext';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useNavigation} from 'react-navigation-hooks';

const NavCategoryHorizontalRoundedWidget = ({
  elements,
  showName = false,
  title,
  showTitle = true,
}) => {
  const {dispatch} = useContext(DispatchContext);
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = useNavigation();
  const handleClick = useCallback(c => {
    return dispatch(setCategoryAndGoToNavChildren(c));
  });

  return (
    <View style={[widgetStyles.container, {backgroundColor: 'transaprent'}]}>
      {showTitle ? (
        <TouchableOpacity
          style={widgetStyles.titleContainer}
          onPress={() => navigate('ParentCategoryIndex')}>
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
      ) : null}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={widgetStyles.wrapper}>
        {map(elements, (c, i) => (
          <TouchableOpacity
            key={i}
            style={widgetStyles.btnStyle}
            onPress={() => handleClick(c)}>
            <FastImage
              source={{
                uri: c.thumb,
                priority: FastImage.priority.normal,
              }}
              loadingIndicatorSource={images.logo}
              style={styles.image}
              resizeMode="cover"
            />
            {showName ? (
              <Text
                style={[
                  widgetStyles.elementName,
                  {color: colors.header_tow_theme_color},
                ]}>
                {c.name}
              </Text>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default NavCategoryHorizontalRoundedWidget;

NavCategoryHorizontalRoundedWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
});
