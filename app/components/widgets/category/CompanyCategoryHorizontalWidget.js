import React, {Fragment} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {
  getSearchCompanies,
  getSearchDesigners,
} from '../../../redux/actions/user';
import I18n, {isRTL} from './../../../I18n';
import {Icon} from 'react-native-elements';
import widgetStyles from './../widgetStyles';
import {useDispatch, useSelector} from 'react-redux';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {
  iconSizes,
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import {isEmpty} from 'lodash';
import {useNavigation} from '@react-navigation/native';

const CompanyCategoryHorizontalWidget = ({
  elements,
  title = '',
  showName = true,
  showImage = true,
  showArrow = false,
}) => {
  const {colors} = useSelector(state => state.settings);
  const {navigate} = useNavigation();
  const dispatch = useDispatch();

  const handleClick = c =>
    dispatch(
      getSearchDesigners({
        name: c.name,
        searchParams: {user_category_id: c.id},
        redirect: true,
      }),
    );

  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View
          style={[
            widgetStyles.container,
            {
              backgroundColor: 'transparent',
              alignSelf: 'center',
              // borderWidth : 0.5,
            },
          ]}>
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
            onPress={() => (showArrow ? navigate('CategoryIndex') : null)}>
            <View style={widgetStyles.titleWrapper}>
              <Text
                style={[
                  widgetStyles.title,
                  {color: colors.header_one_theme_color},
                ]}>
                {title}
              </Text>
            </View>
            {showArrow && (
              <Icon
                type="entypo"
                name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                size={iconSizes.smallest}
                color={colors.header_one_theme_color}
              />
            )}
          </Pressable>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentInset={{right: rightHorizontalContentInset}}
            style={widgetStyles.wrapper}>
            {map(elements, (c, i) => (
              <View
                animation="bounceIn"
                easing="ease-out"
                key={i}
                useNativeDriver={true}>
                <Pressable
                  activeOpacity={touchOpacity}
                  style={widgetStyles.btnStyle}
                  onPress={() => handleClick(c)}>
                  <ImageLoaderContainer
                    img={c.thumb}
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
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </Fragment>
  );
};

export default CompanyCategoryHorizontalWidget;

CompanyCategoryHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool,
};

const styles = StyleSheet.create({
  image: {
    width: 90,
    height: 90,
    borderRadius: 15,
  },
});
