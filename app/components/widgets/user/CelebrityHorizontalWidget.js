import React, {Fragment} from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {getCelebrity, getSearchCelebrities} from '../../../redux/actions/user';
import {Icon} from 'react-native-elements';
import {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

const CelebrityHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  searchParams,
}) => {
  const dispatch = useDispatch();
  const {colors} = useSelector((state) => state.settings);
  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View style={widgetStyles.container}>
          <TouchableOpacity
            activeOpacity={touchOpacity}
            style={widgetStyles.titleContainer}
            onPress={() =>
              dispatch(
                getSearchCelebrities({
                  searchParams,
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
            contentInset={{right: rightHorizontalContentInset}}
            style={widgetStyles.wrapper}>
            {map(elements, (c, i) => (
              <View
                animation="pulse"
                easing="ease-out"
                key={c.id}
                useNativeDriver={true}>
                <TouchableOpacity
                  activeOpacity={touchOpacity}
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
      )}
    </Fragment>
  );
};

export default CelebrityHorizontalWidget;

CelebrityHorizontalWidget.propTypes = {
  searchParams: PropTypes.object.isRequired,
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
