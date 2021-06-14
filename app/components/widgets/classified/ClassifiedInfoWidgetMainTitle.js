import React, {useContext, useState, Fragment} from 'react';
import FastImage from 'react-native-fast-image';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {iconSizes, text, touchOpacity} from '../../../constants/sizes';
import {getProductConvertedFinalPrice} from '../../../helpers';
import PropTypes from 'prop-types';
import {round} from 'lodash';
import {GlobalValuesContext} from '../../../redux/GlobalValuesContext';
import {Badge, Icon} from 'react-native-elements';
import {showCommentModal} from '../../../redux/actions';
import {
  deleteClassified,
  toggleClassifiedFavorite,
} from '../../../redux/actions/classified';
import I18n from './../../../I18n';
import {useDispatch, useSelector} from 'react-redux';

const ClassifiedInfoWidgetMainTitle = ({element, editMode = false}) => {
  const dispatch = useDispatch();
  const {colors, exchange_rate, currency_symbol, logo} =
    useContext(GlobalValuesContext);
  const {token, guest} = useSelector(state => state);
  const [favorite, setFavorite] = useState(element.isFavorite);
  const {navigate} = navigation;

  const handleDelete = () => {
    return Alert.alert(
      I18n.t('delete_classified'),
      I18n.t('are_u_sure_u_want_to_remove_classified'),
      [
        {
          text: I18n.t('cancel'),
          // onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: I18n.t('confirm'),
          onPress: () => dispatch(deleteClassified(element.id)),
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View
      style={{
        padding: 0,
        marginTop: 20,
        marginBottom: 10,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <FastImage
        source={{uri: element.user.thumb ? element.user.thumb : logo}}
        style={{
          width: 60,
          height: 60,
          borderRadius: 60 / 2,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
      />
      <View style={{width: '55%'}}>
        <Text
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            fontSize: 18,
            color: colors.header_one_theme_color,
            textAlign: 'left',
            fontFamily: text.font,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}>
          {element.name}
        </Text>
        <Text
          style={{
            paddingRight: 5,
            paddingLeft: 5,
            paddingBottom: 5,
            fontSize: 10,
            color: colors.header_one_theme_color,
            textAlign: 'left',
            fontFamily: text.font,
          }}>
          {element.user.slug}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            minWidth: '60%',
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.productTitle,
                {
                  color: element.isOnSale ? 'grey' : 'black',
                  textDecorationLine: element.isOnSale ? 'line-through' : null,
                },
              ]}>
              {round(
                getProductConvertedFinalPrice(element.price, exchange_rate),
                2,
              )}
            </Text>
            <Text
              style={[
                styles.productTitle,
                {
                  color: element.isOnSale ? 'grey' : 'black',
                  textDecorationLine: element.isOnSale ? 'line-through' : null,
                },
              ]}>
              {currency_symbol}
            </Text>
          </View>
          {element.isOnSale && (
            <View style={{flexDirection: 'row'}}>
              <Text style={[styles.productTitle, {color: 'red'}]}>
                {round(
                  getProductConvertedFinalPrice(
                    element.sale_price,
                    exchange_rate,
                  ),
                  2,
                )}
              </Text>
              <Text style={styles.productTitle}>{currency_symbol}</Text>
            </View>
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1,
        }}>
        {editMode && (
          <Fragment>
            <Icon
              underlayColor="transparent"
              name="edit"
              size={iconSizes.smallest}
              type="antdesign"
              title={I18n.t('edit')}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              onPress={() =>
                navigate({
                  routeName: 'ClassifiedEdit',
                  params: {
                    name: element.name,
                  },
                })
              }
            />
            <Icon
              underlayColor="transparent"
              name="delete"
              size={iconSizes.smallest}
              type="antdesign"
              title={I18n.t('delete')}
              hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
              onPress={() => handleDelete()}
            />
          </Fragment>
        )}
        {!guest ? (
          <Icon
            onPress={() => {
              setFavorite(!favorite);
              dispatch(
                toggleClassifiedFavorite({
                  api_token: token,
                  classified_id: element.id,
                }),
              );
            }}
            name={favorite ? 'star' : 'staro'}
            type="antdesign"
            size={iconSizes.smallest}
            underlayColor="transparent"
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            color="#FCD12A"
          />
        ) : null}
        <TouchableOpacity
          activeOpacity={touchOpacity}
          onPress={() => dispatch(showCommentModal())}>
          <Icon
            name="comment-account-outline"
            type="material-community"
            color={colors.header_tow_theme_color}
            size={iconSizes.smallest}
            hitSlop={{top: 25, bottom: 25, left: 25, right: 25}}
          />
          <Badge
            status="warning"
            value={element.commentsCount}
            containerStyle={{position: 'absolute', top: -10, right: -4}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClassifiedInfoWidgetMainTitle;

ClassifiedInfoWidgetMainTitle.propTypes = {
  element: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  productTitle: {
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
    color: 'black',
    textAlign: 'left',
    fontFamily: text.font,
  },
});
