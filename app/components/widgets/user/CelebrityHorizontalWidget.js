import React, {Fragment} from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {map} from 'lodash';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';
import {getCelebrity, getSearchCelebrities} from '../../../redux/actions/user';
import {Icon} from 'react-native-elements';
import I18n, {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import {
  iconSizes,
  rightHorizontalContentInset,
  touchOpacity,
  userWidget,
} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import {APP_CASE} from '../../../../app.json';
import {isIOS} from '../../../constants';
import ImageLoaderContainer from '../ImageLoaderContainer';

const CelebrityHorizontalWidget = ({
  elements,
  showName,
  title,
  name,
  searchParams,
  rounded = false,
  showAll = false,
  width = userWidget[APP_CASE].small.width,
  height = userWidget[APP_CASE].small.height,
}) => {
  const dispatch = useDispatch();
  const {colors} = useSelector(state => state.settings);
  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View style={[widgetStyles.container]}>
          <TouchableOpacity
            activeOpacity={touchOpacity}
            style={[
              widgetStyles.titleContainer,
              {
                height: 40,
                alignItems: 'baseline',
                borderBottomColor: colors.header_one_theme_color,
                borderBottomWidth: 0.5,
                marginBottom: 10,
              },
            ]}
            onPress={() =>
              dispatch(
                getSearchCelebrities({
                  searchParams,
                  name,
                  redirect: true,
                }),
              )
            }>
            <View style={[widgetStyles.titleWrapper]}>
              <Text
                style={[
                  widgetStyles.title,
                  {color: colors.header_one_theme_color, paddingLeft: 10},
                ]}>
                {title}
              </Text>
            </View>
            {showAll && (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <Text
                  style={[
                    widgetStyles.headerThree,
                    {color: colors.btn_bg_theme_color},
                  ]}>
                  {I18n.t('show_all')}
                </Text>
                <Icon
                  type="entypo"
                  name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                  size={iconSizes.tiny}
                  color={colors.header_one_theme_color}
                />
              </View>
            )}
          </TouchableOpacity>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentInset={{right: rightHorizontalContentInset}}
            contentContainerStyle={widgetStyles.wrapper}>
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
                  <ImageLoaderContainer
                    img={c.thumb}
                    style={{
                      width,
                      height,
                      borderRadius:
                        isIOS && rounded
                          ? width / 2
                          : !isIOS && rounded
                          ? width * 2
                          : 0,
                    }}
                    resizeMode="cover"
                  />
                  {showName ? (
                    <Text
                      style={[
                        widgetStyles.elementName,
                        {color: colors.header_one_theme_color},
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
