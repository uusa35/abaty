import React, {useContext, useCallback} from 'react';
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
import {getSearchServices} from '../../../redux/actions/service';
import {isRTL} from './../../../I18n';
import {Icon} from 'react-native-elements';
import widgetStyles from './../widgetStyles';
import {images} from '../../../constants/images';

const ServiceCategoryHorizontalBtnsWidget = ({
  elements,
  title,
  dispatch,
  colors,
  navigation,
  showName = true,
  showImage = true,
}) => {
  const handleClick = useCallback(c => {
    return dispatch(
      getSearchServices({
        name: c.name,
        searchParams: {service_category_id: c.id},
        redirect: true,
      }),
    );
  });

  return (
    <View
      style={[
        widgetStyles.container,
        {backgroundColor: 'transparent', alignSelf: 'center'},
      ]}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() => navigation.navigate('CategoryIndex')}>
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
          <TouchableOpacity
            key={i}
            style={[
              widgetStyles.btnStyle,
              {
                borderWidth: 0.5,
                borderColor: colors.btn_bg_theme_color,
                padding: 10,
              },
            ]}
            onPress={() => handleClick(c)}>
            {showImage ? (
              <FastImage
                source={{
                  uri: c.thumb,
                  priority: FastImage.priority.normal,
                }}
                loadingIndicatorSource={images.logo}
                style={styles.image}
                resizeMode="cover"
              />
            ) : null}
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

export default ServiceCategoryHorizontalBtnsWidget;

ServiceCategoryHorizontalBtnsWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 400,
  },
});
