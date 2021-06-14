import React, {useCallback, Fragment, useContext} from 'react';
import {ScrollView, TouchableOpacity, StyleSheet, Text} from 'react-native';
import {View} from 'react-native-animatable';
import {map} from 'lodash';
import PropTypes from 'prop-types';
import {getSearchProducts} from '../../../redux/actions/product';
import I18n, {isRTL} from './../../../I18n';
import {Icon} from 'react-native-elements';
import widgetStyles from './../widgetStyles';
import {
  iconSizes,
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useNavigation} from '@react-navigation/native';

const ProductCategoryHorizontalRoundedWidget = ({
  elements,
  showName,
  title,
  showAll = false,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {country} = useSelector(state => state);
  const {colors} = useContext(GlobalValuesContext);
  const handleClick = useCallback(c => {
    return dispatch(
      getSearchProducts({
        name: c.name,
        searchParams: {product_category_id: c.id, country_id: country.id},
        redirect: true,
      }),
    );
  });

  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View
          style={[widgetStyles.container, {backgroundColor: 'transparent'}]}>
          <TouchableOpacity
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
            onPress={() => navigation.navigate('CategoryTab')}>
            <View style={widgetStyles.titleWrapper}>
              <Text
                style={[
                  widgetStyles.title,
                  {color: colors.header_one_theme_color},
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
                <Icon
                  type="entypo"
                  name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                  size={iconSizes.smallest}
                  color={colors.header_one_theme_color}
                />
              </View>
            )}
          </TouchableOpacity>
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
                <TouchableOpacity
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
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>
      )}
    </Fragment>
  );
};

export default ProductCategoryHorizontalRoundedWidget;

ProductCategoryHorizontalRoundedWidget.propTypes = {
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
