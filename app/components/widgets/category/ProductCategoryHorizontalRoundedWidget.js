import React, {useCallback, Fragment} from 'react';
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
import {getSearchProducts} from '../../../redux/actions/product';
import {isRTL} from './../../../I18n';
import {Icon} from 'react-native-elements';
import widgetStyles from './../widgetStyles';
import {
  rightHorizontalContentInset,
  touchOpacity,
} from '../../../constants/sizes';
import {images} from '../../../constants/images';
import {useNavigation} from 'react-navigation-hooks';
import {useDispatch, useSelector} from 'react-redux';
import {isEmpty} from 'lodash';

const ProductCategoryHorizontalRoundedWidget = ({
  elements,
  showName,
  title,
}) => {
  const {navigate} = useNavigation();
  const dispatch = useDispatch();
  const {colors} = useSelector((state) => state.settings);
  const handleClick = useCallback((c) => {
    return dispatch(
      getSearchProducts({
        name: c.name,
        searchParams: {product_category_id: c.id},
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
            style={widgetStyles.titleContainer}
            onPress={() => navigate('CategoryIndex')}>
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
    // borderRadius: 20
  },
});
