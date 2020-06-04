import React, {useContext, useState, useMemo} from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {text} from '../../../constants/sizes';
import PropTypes from 'prop-types';
import I18n from './../../../I18n';
import validate from 'validate.js';
import {removeItem} from '../../../redux/actions/cart';
import ImageLoaderContainer from '../ImageLoaderContainer';
import {filter, first} from 'lodash';
import {useDispatch} from 'react-redux';
const ProductItem = ({
  item,
  logo,
  editMode,
  qty,
  notes = null,
  timeData = null,
}) => {
  const dispatch = useDispatch();
  const [element, setElement] = useState(item.element);
  const [selectedSize, setSelectedSize] = useState({});
  const [selectedColor, setSelectedColor] = useState({});

  useMemo(() => {
    if (item.size_id) {
      setSelectedSize(
        first(filter(item.element.sizes, (a) => a.id === item.size_id)),
      );
    }
    if (item.color_id) {
      setSelectedColor(
        first(filter(item.element.colors, (a) => a.id === item.color_id)),
      );
    }
  }, [element]);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',
        paddingTop: 10,
        paddingBottom: 10,
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
          paddingLeft: 5,
          paddingRight: 5,
          borderRight: 10.5,
          borderColor: 'grey',
        }}>
        <Text style={styles.mainTitle}>{element.name}</Text>
        {!validate.isEmpty(timeData) ? (
          <View style={{flexDirection: 'row', paddingTop: 3}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('service_date_and_time')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {timeData.date} - {timeData.start}
            </Text>
          </View>
        ) : null}
        {!validate.isEmpty(element.user) ? (
          <View style={{flexDirection: 'row', paddingTop: 3}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('company')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {element.user.slug}
            </Text>
          </View>
        ) : null}
        {!validate.isEmpty(element.sku) ? (
          <View style={{flexDirection: 'row', paddingTop: 3}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('sku')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {element.sku} - {element.id}
            </Text>
          </View>
        ) : null}
        {!validate.isEmpty(element.size) && !element.has_attributes ? (
          <View style={{flexDirection: 'row', paddingTop: 3}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('size')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {element.size.name}
            </Text>
          </View>
        ) : null}
        {!validate.isEmpty(element.color) && !element.has_attributes ? (
          <View style={{flexDirection: 'row', paddingTop: 3}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('color_or_height')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {element.color.name}
            </Text>
          </View>
        ) : null}
        {!validate.isEmpty(element.qty) ? (
          <View style={{flexDirection: 'row', paddingTop: 3}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('qty')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {qty}
            </Text>
          </View>
        ) : null}
        {!validate.isEmpty(selectedColor) ? (
          <View style={{flexDirection: 'row', paddingTop: 3}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('size')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {selectedSize.name}
            </Text>
          </View>
        ) : null}
        {!validate.isEmpty(selectedColor) ? (
          <View style={{flexDirection: 'row', paddingTop: 3}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('color_or_height')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
                color: selectedColor.code,
              }}>
              {selectedColor.name}
            </Text>
          </View>
        ) : null}
        {!validate.isEmpty(notes) ? (
          <View style={{flexDirection: 'row', paddingTop: 3, maxWidth: 140}}>
            <Text style={styles.productItemTitle}>
              {I18n.t('notes')}
              <Text>:</Text>
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.smaller,
                textAlign: 'left',
                paddingLeft: 10,
                paddingRight: 10,
              }}>
              {notes}
            </Text>
          </View>
        ) : null}
      </View>
      {editMode ? (
        <TouchableOpacity
          onPress={() => dispatch(removeItem(element.id))}
          style={{
            flex: 0.2,
            height: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.medium,
                textAlign: 'left',
                paddingLeft: 2,
                paddingRight: 2,
              }}>
              {element.finalPrice}
            </Text>
            <Text
              style={{
                fontFamily: text.font,
                fontSize: text.small,
                textAlign: 'left',
              }}>
              {I18n.t('kwd')}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: 'red',
              height: '40%',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.2,
              shadowRadius: 1.41,

              elevation: 2,
            }}>
            <Text
              style={{
                color: 'white',
                fontFamily: text.font,
                fontSize: text.medium,
              }}>
              {I18n.t('remove')}
            </Text>
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  item: PropTypes.object.isRequired,
  logo: PropTypes.string,
};

const styles = StyleSheet.create({
  logo: {
    width: 90,
    height: 100,
    flex: 0.2,
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
