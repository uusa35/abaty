import {Text, TouchableOpacity, View} from 'react-native';
import widgetStyles from '../widgetStyles';
import React, {useContext} from 'react';
import I18n from './../../../I18n';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {useSelector} from 'react-redux';
import FavoriteIcon from '../favorite/FavoriteIcon';
import FastImage from 'react-native-fast-image';
import {icons} from '../../../constants/images';
import {adjustColor} from '../../../helpers';

const DesigneratAddToCartStickyFooter = ({
  disabled = true,
  handleAddToCart,
}) => {
  const {product} = useSelector(state => state);
  const {colors} = useContext(GlobalValuesContext);
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
        height: '8%',
        backgroundColor: 'black',
      }}>
      <View
        style={{
          backgroundColor: colors.btn_bg_theme_color,
          flex: 0.3,
          flexDirection: 'row',
          height: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <FavoriteIcon id={product.id} />
        <Text
          style={[
            widgetStyles.headerThree,
            {color: colors.btn_text_theme_color},
          ]}>
          {I18n.t('favorite')}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => handleAddToCart()}
        disabled={disabled}
        style={{
          backgroundColor: disabled
            ? adjustColor(colors.footer_bg_theme_color, 90)
            : colors.footer_bg_theme_color,
          flex: 0.7,
          height: '100%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          source={icons.cart}
          resizeMode="contain"
          style={{width: 25, height: 25, marginRight: 20}}
          tintColor={colors.footer_theme_color}
        />
        <Text
          style={[
            widgetStyles.headerThree,
            {color: colors.footer_theme_color},
          ]}>
          {I18n.t('add_to_cart')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default React.memo(DesigneratAddToCartStickyFooter);
