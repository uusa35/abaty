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
import {getSearchClassifieds} from '../../../redux/actions/classified';
import I18n, {isRTL} from './../../../I18n';
import {Icon} from 'react-native-elements';
import widgetStyles from './../widgetStyles';
import {
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useDispatch} from 'react-redux';

const ClassifiedCategoryHorizontalRoundedWidget = ({
  elements,
  showName,
  title,
  showLink = false,
  showTitle = true,
  navigation,
}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const {navigate} = navigation;

  const handleClick = c =>
    dispatch(
      getSearchClassifieds({
        name: c.name,
        searchParams: {classified_category_id: c.id},
        redirect: true,
      }),
    );

  return (
    <View style={[widgetStyles.container, {backgroundColor: 'transaprent'}]}>
      {showTitle ? (
        <TouchableOpacity
          activeOpacity={touchOpacity}
          style={widgetStyles.titleContainer}
          onPress={() =>
            showLink ? navigate('CategoryClassifiedIndex') : null
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
          {showLink ? (
            <Icon
              type="entypo"
              name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
              size={20}
              color={colors.header_one_theme_color}
            />
          ) : null}
        </TouchableOpacity>
      ) : null}
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentInset={{right: rightHorizontalContentInset}}
        style={widgetStyles.wrapper}>
        {map(elements, (c, i) => (
          <TouchableOpacity
            activeOpacity={touchOpacity}
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

export default ClassifiedCategoryHorizontalRoundedWidget;

ClassifiedCategoryHorizontalRoundedWidget.propTypes = {
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
