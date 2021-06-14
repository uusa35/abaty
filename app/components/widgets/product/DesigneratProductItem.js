import React, {useContext, useState, useMemo} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {text, iconSizes} from '../../../constants/sizes';
import PropTypes from 'prop-types';
import I18n from './../../../I18n';
import validate from 'validate.js';
import {removeItem} from '../../../redux/actions/cart';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {filter, first} from 'lodash';
import {useDispatch, useSelector} from 'react-redux';
import widgetStyles from '../widgetStyles';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {Button, Icon} from 'react-native-elements';
import {toggleProductFavorite} from '../../../redux/actions/product';
import FavoriteIcon from '../favorite/FavoriteIcon';

const DesigneratProductItem = ({
  item,
  logo,
  editMode,
  qty,
  notes = null,
  timeData = null,
}) => {
  const {colors} = useContext(GlobalValuesContext);
  const {token, guest} = useSelector(state => state);
  const dispatch = useDispatch();
  const [element, setElement] = useState(item.element);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  useMemo(() => {
    if (item.size_id) {
      setSelectedSize(
        first(filter(item.element.sizes, a => a.id === item.size_id)),
      );
    }
    if (item.color_id) {
      setSelectedColor(
        first(filter(item.element.colors, a => a.id === item.color_id)),
      );
    }
  }, [element]);

  return (
    <View
      style={{
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        padding: 10,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          paddingTop: 10,
          paddingBottom: 10,
          marginBottom: 15,
        }}>
        <ImageLoaderContainer
          img={element.thumb}
          style={styles.logo}
          resizeMode="contain"
        />
        <View
          style={{
            justifyContent: 'flex-start',
            flex: 0.6,
            paddingLeft: 10,
            paddingRight: 5,
          }}>
          <Text style={widgetStyles.headerTow}>{element.name}</Text>
          {!validate.isEmpty(timeData) ? (
            <View style={{flexDirection: 'row', paddingTop: 3}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('service_date_and_time')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text style={widgetStyles.headerThree}>
                {timeData.date} - {timeData.start}
              </Text>
            </View>
          ) : null}
          {!validate.isEmpty(element.user) ? (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('company')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text style={widgetStyles.headerThree}>{element.user.slug}</Text>
            </View>
          ) : null}
          {!validate.isEmpty(element.sku) ? (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('sku')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text style={widgetStyles.headerThree}>
                {element.sku} - {element.id}
              </Text>
            </View>
          ) : null}
          {!validate.isEmpty(element.size) && !element.has_attributes ? (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('size')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text style={widgetStyles.headerThree}>{element.size.name}</Text>
            </View>
          ) : null}
          {!validate.isEmpty(element.color) && !element.has_attributes ? (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('color_or_height')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text style={widgetStyles.headerThree}>{element.color.name}</Text>
            </View>
          ) : null}
          {!validate.isEmpty(element.qty) ? (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('qty')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text style={widgetStyles.headerThree}>{qty}</Text>
            </View>
          ) : null}
          {!validate.isEmpty(selectedColor) ? (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('size')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text style={widgetStyles.headerThree}>{selectedSize.name}</Text>
            </View>
          ) : null}
          {!validate.isEmpty(selectedColor) ? (
            <View style={{flexDirection: 'row', paddingTop: 8}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('color_or_height')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text
                style={[widgetStyles.headerFour, {color: selectedColor.code}]}>
                {selectedColor.name}
              </Text>
            </View>
          ) : null}
          {!validate.isEmpty(notes) ? (
            <View style={{flexDirection: 'row', paddingTop: 8, maxWidth: 150}}>
              <Text style={[widgetStyles.headerFour, {width: 100}]}>
                {I18n.t('notes')}
                <Text style={{color: 'black'}}>:</Text>
              </Text>
              <Text style={widgetStyles.headerFour}>{notes}</Text>
            </View>
          ) : null}
          <Text style={[widgetStyles.headerTow, {paddingTop: 10}]}>
            {element.finalPrice} {I18n.t('kwd')}
          </Text>
        </View>
      </View>
      {editMode ? (
        <View
          style={{
            borderTopWidth: 0.5,
            borderTopColor: colors.btn_bg_theme_color,
            paddingTop: 20,
            flexDirection: 'row',
            flex: 1,
          }}>
          {item.cart_id && (
            <Button
              containerStyle={{
                flex: 0.4,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              buttonStyle={{
                width: '90%',
                borderRadius: 0,
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRightWidth: 1,
                borderRightColor: colors.btn_bg_theme_color,
              }}
              titleStyle={[
                widgetStyles.headerThree,
                {color: colors.header_one_theme_color},
              ]}
              onPress={() => dispatch(removeItem(item.cart_id))}
              title={I18n.t('remove')}
              icon={
                <Icon name="close" type="evilicon" size={iconSizes.smaller} />
              }
              type="clear"
            />
          )}
          <Button
            containerStyle={{
              flex: 0.6,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            buttonStyle={{
              width: '100%',
              borderRadius: 0,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
            titleStyle={[
              widgetStyles.headerFour,
              {color: colors.header_one_theme_color},
            ]}
            onPress={() =>
              dispatch(
                toggleProductFavorite({
                  api_token: token,
                  product_id: element.id,
                }),
              )
            }
            title={I18n.t('make_as_favorite')}
            icon={() => (
              <FavoriteIcon id={element.id} size={iconSizes.smallest} />
            )}
            type="clear"
          />
        </View>
      ) : null}
    </View>
  );
};

export default DesigneratProductItem;

DesigneratProductItem.propTypes = {
  item: PropTypes.object.isRequired,
  logo: PropTypes.string,
};

const styles = StyleSheet.create({
  logo: {
    width: 90,
    height: 100,
    flex: 0.2,
    borderRadius: 8,
  },
  mainTitle: {
    fontFamily: text.font,
    fontSize: 15,
    textAlign: 'left',
  },
  elementRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 10,
  },
  productItemTitle: {
    width: 90,
    fontFamily: text.font,
    fontSize: text.smaller,
    textAlign: 'left',
  },
});
