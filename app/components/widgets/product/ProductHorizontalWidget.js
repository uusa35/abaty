import React, {useContext, Fragment, useCallback} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Pressable,
} from 'react-native';
import {map, isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import {Icon} from 'react-native-elements';
import {getProduct, getSearchProducts} from '../../../redux/actions/product';
import {isRTL} from './../../../I18n';
import widgetStyles from './../widgetStyles';
import ProductWidget from './../product/ProductWidget';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {rightHorizontalContentInset} from '../../../constants/sizes';
import {useDispatch, useSelector} from 'react-redux';
import ProductNormalWidget from './ProductNormalWidget';

const ProductHorizontalWidget = ({
  elements,
  showName,
  title,
  showLink = false,
  searchParams,
}) => {
  const dispatch = useDispatch();
  const {colors} = useContext(GlobalValuesContext);
  const {token} = useSelector(state => state);

  const handleClickProductWidget = element => {
    return dispatch(
      getProduct({
        element,
        id: element.id,
        api_token: token ? token : null,
        redirect: true,
      }),
    );
  };

  const handleGetProducts = () =>
    dispatch(
      getSearchProducts({
        searchParams,
        redirect: true,
      }),
    );

  return (
    <Fragment>
      {!isEmpty(elements) && (
        <View
          style={[
            widgetStyles.container,
            {backgroundColor: 'transparent', marginTop: 0},
          ]}>
          <Pressable
            activeOpacity={0.8}
            style={[
              widgetStyles.titleContainer,
              {
                paddingLeft: 10,
                paddingRight: 10,
                paddingBottom: 10,
              },
            ]}
            onPress={() => (showLink ? handleGetProducts() : null)}>
            <View style={widgetStyles.titleWrapper}>
              <Text
                style={[
                  widgetStyles.title,
                  {color: colors.header_one_theme_color},
                ]}>
                {title}
              </Text>
            </View>
            {showLink && (
              <Icon
                type="entypo"
                name={isRTL ? 'chevron-thin-left' : 'chevron-thin-right'}
                size={20}
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
              <ProductNormalWidget
                element={c}
                showName={showName}
                key={i}
                handleClickProductWidget={handleClickProductWidget}
                width={180}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </Fragment>
  );
};

export default ProductHorizontalWidget;

ProductHorizontalWidget.propTypes = {
  elements: PropTypes.array.isRequired,
  showName: PropTypes.bool,
};
