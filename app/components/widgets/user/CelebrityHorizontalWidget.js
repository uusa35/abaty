import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {
  getCelebrity,
  getDesigner,
  getSearchCelebrities,
  getSearchCompanies,
  getSearchDesigners,
  getUsers,
} from '../../../redux/actions';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {images} from '../../../constants';

const CelebrityHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  dispatch,
  colors,
  searchElements,
}) => {
  const [params, setParams] = useState(searchElements);
  return (
    <View style={widgetStyles.container}>
      <TouchableOpacity
        style={widgetStyles.titleContainer}
        onPress={() =>
          dispatch(
            getSearchCelebrities({
              searchParams: {is_celebrity: 1},
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
          <View animation="pulse" easing="ease-out" key={c.id}>
            <TouchableOpacity
              key={i}
              style={widgetStyles.btnStyle}
              onPress={() =>
                dispatch(
                  getCelebrity({
                    id: c.id,
                    searchParams: {user_id: c.id},
                    redirect: true,
                  }),
                )
              }>
              <FastImage
                source={{
                  uri: c.thumb,
                  priority: FastImage.priority.normal,
                }}
                loadingIndicatorSource={images.logo}
                style={styles.image}
                resizeMode="contain"
              />
              {showName ? (
                <Text
                  style={[
                    widgetStyles.elementName,
                    {color: colors.header_tow_theme_color},
                  ]}>
                  {c.slug}
                </Text>
              ) : null}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default CelebrityHorizontalWidget;

CelebrityHorizontalWidget.propTypes = {
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
